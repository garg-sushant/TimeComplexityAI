
import { GoogleGenAI } from '@google/genai';

// Mock getEnv for testing
const mockEnv: Record<string, string> = {
  'VITE_GEMINI_API_KEYS': 'KEY_1, KEY_2, KEY_3'
};

const getEnv = (name: string) => mockEnv[name];

// Re-implementing KeyManager for verification in this script 
// (Normally we'd import but I want to avoid ESM/TS issues in a quick script)
class KeyManager {
  private keys: string[] = [];
  private currentIndex = 0;
  private cooldowns: Map<string, number> = new Map();
  private readonly COOLDOWN_DURATION = 1000; // 1 second for test

  constructor() {
    const multiKeys = getEnv('VITE_GEMINI_API_KEYS');
    if (multiKeys) {
      this.keys = multiKeys.split(',').map(k => k.trim()).filter(Boolean);
    }
  }

  public getNextAvailable(): { ai: any; key: string } | null {
    if (this.keys.length === 0) return null;
    const now = Date.now();
    let checkedCount = 0;
    while (checkedCount < this.keys.length) {
      const key = this.keys[this.currentIndex];
      const cooldownUntil = this.cooldowns.get(key) || 0;
      if (now > cooldownUntil) {
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        return { ai: { apiKey: key }, key };
      }
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      checkedCount++;
    }
    return null;
  }

  public markAsExhausted(key: string) {
    this.cooldowns.set(key, Date.now() + this.COOLDOWN_DURATION);
  }
}

async function runTest() {
  const km = new KeyManager();
  console.log('Testing Key Rotation...');

  // 1. Initial State
  const k1 = km.getNextAvailable();
  console.log('Got Key:', k1?.key); // Should be KEY_1

  // 2. Mark KEY_1 as exhausted
  km.markAsExhausted(k1!.key);
  console.log('Marked KEY_1 as exhausted.');

  // 3. Get next - should be KEY_2
  const k2 = km.getNextAvailable();
  console.log('Got Key:', k2?.key); // Should be KEY_2

  // 4. Mark KEY_2 as exhausted
  km.markAsExhausted(k2!.key);
  console.log('Marked KEY_2 as exhausted.');

  // 5. Get next - should be KEY_3
  const k3 = km.getNextAvailable();
  console.log('Got Key:', k3?.key); // Should be KEY_3

  // 6. Mark KEY_3 as exhausted
  km.markAsExhausted(k3!.key);
  console.log('Marked KEY_3 as exhausted. ALL keys exhausted now.');

  // 7. Try to get key while all are in cooldown
  const kNone = km.getNextAvailable();
  console.log('Got Key (should be null):', kNone);

  // 8. Wait for cooldown (1.1s)
  console.log('Waiting for cooldown...');
  await new Promise(r => setTimeout(r, 1100));

  // 9. Should get KEY_1 again (or whoever is next in rotation)
  const kRetry = km.getNextAvailable();
  console.log('Got Key after cooldown:', kRetry?.key);
}

runTest().catch(console.error);
