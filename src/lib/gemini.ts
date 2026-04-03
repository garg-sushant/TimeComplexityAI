import { GoogleGenAI, Type } from '@google/genai';
import { getEnv } from '../utils/env';
import { AnalysisResult, StepByStepAnalysis } from '../types';

// 🗝️ Key Rotation Manager
class KeyManager {
  private keys: string[] = [];
  private currentIndex = 0;
  private cooldowns: Map<string, number> = new Map();
  private readonly COOLDOWN_DURATION = 60 * 1000; // 1 minute cooldown
  private readonly API_VERSION = 'v1beta';

  constructor() {
    // 1. Try VITE_GEMINI_API_KEYS first
    const multiKeys = getEnv('VITE_GEMINI_API_KEYS');
    if (multiKeys) {
      this.keys.push(...multiKeys.split(',').map(k => k.trim()).filter(Boolean));
    }
    
    // 2. Also check VITE_GEMINI_API_KEY (support single or comma-separated here too)
    const singleKey = getEnv('VITE_GEMINI_API_KEY');
    if (singleKey) {
      const splitKeys = singleKey.split(',').map(k => k.trim()).filter(Boolean);
      splitKeys.forEach(k => {
        if (!this.keys.includes(k)) this.keys.push(k);
      });
    }
    
    if (this.keys.length === 0) {
      console.warn('⚠️ No Gemini API keys found in environment. AI features will fail.');
    } else {
      console.log(`✅ Loaded ${this.keys.length} Gemini API keys into Rotation Pool.`);
    }
  }

  /**
   * ⏭️ Gets the next available Gemini instance and its key.
   * Skips keys that are currently in cooldown.
   */
  public getNextAvailable(): { ai: GoogleGenAI; key: string } | null {
    if (this.keys.length === 0) return null;

    const now = Date.now();
    let checkedCount = 0;

    // Cycle through keys to find one not in cooldown
    while (checkedCount < this.keys.length) {
      const key = this.keys[this.currentIndex];
      const cooldownUntil = this.cooldowns.get(key) || 0;

      if (now > cooldownUntil) {
        // This key is healthy
        // Gemini API keys provided via AI Studio for these models may require /v1beta.
        // Setting apiVersion avoids SDK calling the wrong default endpoint.
        const ai = new GoogleGenAI({ apiKey: key, apiVersion: this.API_VERSION });
        const result = { ai, key };
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        return result;
      }

      // Skip this key and move to next
      this.currentIndex = (this.currentIndex + 1) % this.keys.length;
      checkedCount++;
    }

    // All keys might be in cooldown
    return null;
  }

  /**
   * 🧊 Marks a key as exhausted and puts it on a cooldown.
   */
  public markAsExhausted(key: string) {
    const redactedKey = `${key.substring(0, 8)}...`;
    console.warn(`[KeyManager] 🧊 Key ${redactedKey} marked as exhausted. Cooldown for 60s.`);
    this.cooldowns.set(key, Date.now() + this.COOLDOWN_DURATION);
  }

  public getPoolSize(): number {
    return this.keys.length;
  }

  /**
   * Returns how long (ms) until at least one key becomes available again.
   * If keys are already available, returns 0.
   * Returns null when there are no keys configured.
   */
  public getSoonestAvailableInMs(): number | null {
    if (this.keys.length === 0) return null;

    const now = Date.now();
    let soonest: number | null = null;

    for (const key of this.keys) {
      const until = this.cooldowns.get(key) || 0;
      if (now > until) return 0;
      const remaining = until - now;
      if (soonest === null || remaining < soonest) soonest = remaining;
    }

    return soonest ?? null;
  }
}

const keyManager = new KeyManager();

/**
 * 🔄 withRetry: A high-order wrapper that handles key rotation on failure (Rate Limit/Exhaustion).
 */
async function withRetry<T>(fn: (ai: GoogleGenAI) => Promise<T>): Promise<T> {
  const poolSize = keyManager.getPoolSize();
  const maxAttempts = Math.max(1, poolSize);
  let lastError: any;
  let exhaustionWaits = 0; // avoid infinite waiting when all keys are rate-limited

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const instance = keyManager.getNextAvailable();
    const redactedKey = instance ? `${instance.key.substring(0, 8)}...` : 'NONE';
    
    if (!instance) {
      console.error(`[withRetry] ❌ No healthy keys available out of ${poolSize} total. All in cooldown.`);
      const delayMs = keyManager.getSoonestAvailableInMs();
      if (delayMs !== null && delayMs > 0 && exhaustionWaits < 1) {
        exhaustionWaits++;
        const safeDelay = Math.min(delayMs, 2 * 60 * 1000); // cap at 2 minutes
        console.warn(`[withRetry] ⏳ Waiting ${safeDelay}ms for a key cooldown to expire...`);
        await new Promise(r => setTimeout(r, safeDelay + 250));
        continue; // re-check keys
      }

      if (lastError) throw lastError;
      throw new Error('All Gemini API keys are currently exhausted. Please try again later.');
    }

    const { ai, key } = instance;

    try {
      if (attempt > 0) console.log(`[withRetry] 🔄 Retrying with key: ${redactedKey}`);
      return await fn(ai);
    } catch (error: any) {
      lastError = error;
      const status =
        error?.status ??
        error?.statusCode ??
        error?.response?.status ??
        (error?.stack?.includes('429') ? 429 : 0);
      const message = (error?.message || '').toLowerCase();

      // Only rotate/exhaust keys when the error plausibly comes from quota/rate limiting
      // or the key being invalid/unauthorized.
      const isExhausted = status === 429 || message.includes('quota') || message.includes('rate limit') || message.includes('exceeded');
      const isInvalidOrUnauthorized = status === 401 || status === 403 || message.includes('unauthorized') || (message.includes('invalid') && message.includes('key'));
      const isMethodOrModelNotFound = status === 404 || message.includes('not found') || message.includes('not supported') || message.includes('method');

      const shouldExhaustKey = isExhausted || isInvalidOrUnauthorized || isMethodOrModelNotFound;

      if (!shouldExhaustKey) {
        // Example: model not supported / safety filtering / other configuration issues.
        // Rotating API keys typically won't fix these; fail fast.
        console.error(`[withRetry] ❌ Non-key error with key: ${redactedKey}. Error:`, error.message);
        throw error;
      }

      keyManager.markAsExhausted(key);

      if (attempt < maxAttempts - 1) {
        const errorType = isInvalidOrUnauthorized ? 'Unauthorized/Invalid' : isMethodOrModelNotFound ? 'MissingMethod/Model' : 'Quota/RateLimit';
        console.warn(`[withRetry] 🔄 Key ${redactedKey} failed (${errorType}). Rotating to next key...`);
        continue;
      }

      console.error(`[withRetry] ❌ Final quota/rate-limit failure with key: ${redactedKey}. Error:`, error.message);
      throw error;
    }
  }
  throw lastError;
}

/**
 * 🛠️ helper for model fallback logic
 */
function toFormalContents(promptText: string) {
  // @google/genai SDK expects structured Content objects for request compatibility.
  return [{ role: 'user' as const, parts: [{ text: promptText }] }];
}

async function callWithFallback(ai: GoogleGenAI, promptText: string, config: any = {}) {
  const contents = toFormalContents(promptText);

  // Fallback chain: 3.1-flash -> 2.5-flash -> 2.0-flash -> 1.5-flash
  const models = ['gemini-3.1-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  let lastError: any;

  for (const model of models) {
    try {
      return await ai.models.generateContent({
        model,
        contents,
        config,
      });
    } catch (err: any) {
      lastError = err;
      const msg = (err?.message || '').toLowerCase();
      const isUnsupported = err.status === 404 || msg.includes('not found') || msg.includes('not supported');
      if (isUnsupported) {
        console.warn(`⚠️ [callWithFallback] Model ${model} not supported. Falling back...`);
        continue;
      }
      throw err; // Rethrow quota/rate limit/auth errors to trigger key rotation
    }
  }
  throw lastError;
}

export const analyzeCodeComplexity = async (code: string): Promise<AnalysisResult> => {
  return withRetry(async (ai) => {
    const promptText = `Analyze the following code and provide its time and space complexity. Provide a clear, straightforward, and mathematical explanation of how the algorithm works and why it has that complexity. Do not use a story-like or whimsical tone. Structure the explanation as a precise list of points.\n\nCode:\n${code}`;
    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          complexity: { type: Type.STRING, description: 'Exact Big O time complexity, e.g., O(N^2)' },
          complexityClass: { type: Type.STRING, description: 'The general complexity class. Must be one of: "O(1)", "O(log N)", "O(N)", "O(N log N)", "O(N^2)", "O(2^N)", "O(N!)", or "Unknown"' },
          spaceComplexity: { type: Type.STRING, description: 'Exact Big O space complexity, e.g., O(1)' },
          explanationPoints: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'A structured list of precise, mathematical points explaining the time and space complexity.' 
          }
        },
        required: ['complexity', 'complexityClass', 'spaceComplexity', 'explanationPoints']
      }
    };

    const response = await callWithFallback(ai, promptText, config);
    const text = response.text;
    if (!text) throw new Error('No response from Gemini');
    return JSON.parse(text) as AnalysisResult;
  });
};

export const analyzeCodeStepByStep = async (code: string): Promise<StepByStepAnalysis> => {
  return withRetry(async (ai) => {
    const promptText = `Analyze the following code step-by-step and provide its time and space complexity. Break the code down into logical blocks or lines. For each block, provide the code snippet, its specific time complexity, and a mathematical explanation of why. Finally, provide the overall time and space complexity.\n\nCode:\n${code}`;
    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallTimeComplexity: { type: Type.STRING, description: 'Exact overall Big O time complexity, e.g., O(N^2)' },
          overallSpaceComplexity: { type: Type.STRING, description: 'Exact overall Big O space complexity, e.g., O(1)' },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                codeSnippet: { type: Type.STRING, description: 'The specific block or line of code being analyzed.' },
                timeComplexity: { type: Type.STRING, description: 'The time complexity of this specific block, e.g., O(1) or O(N).' },
                explanation: { type: Type.STRING, description: 'A mathematical explanation of why this block has this complexity.' }
              },
              required: ['codeSnippet', 'timeComplexity', 'explanation']
            },
            description: 'A step-by-step breakdown of the code.'
          }
        },
        required: ['overallTimeComplexity', 'overallSpaceComplexity', 'steps']
      }
    };

    const response = await callWithFallback(ai, promptText, config);
    const text = response.text;
    if (!text) throw new Error('No response from Gemini');
    return JSON.parse(text) as StepByStepAnalysis;
  });
};

export const fastCodeHint = async (code: string): Promise<string> => {
  return withRetry(async (ai) => {
    const response = await callWithFallback(
      ai,
      `Give a very short, 1-sentence whimsical hint about the time complexity of this code:\n\n${code}`
    );
    return response.text || 'Hmm, this code is quite mysterious!';
  });
};

export const searchTutorials = async (query: string): Promise<string> => {
  return withRetry(async (ai) => {
    const contents = toFormalContents(`Search for the latest information and tutorials about: ${query}. Provide a short, engaging summary and list 3 key concepts to learn.`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || 'Could not find tutorials at this time.';
  });
};
