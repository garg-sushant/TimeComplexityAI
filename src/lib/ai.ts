import { GoogleGenAI, Type } from '@google/genai';
import { OpenAI } from 'openai';
import { getEnv } from '../utils/env';
import { AnalysisResult, StepByStepAnalysis } from '../types';

/**
 * 🧹 Logical Code Normalizer
 * Standardizes code by removing comments and collapsing whitespaces.
 * This ensures that logically identical code snippets resulted in consistent cache hits.
 */
function normalizeCode(code: string): string {
  return code
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Remove all comments
    .replace(/\s+/g, ' ')                   // Collapse all whitespace to single spaces
    .trim();                                // Trim edges
}

/**
 * 🗝️ Universal Provider Interface
 */
interface AIProvider {
  name: string;
  analyzeComplexity(code: string): Promise<AnalysisResult>;
  analyzeStepByStep(code: string): Promise<StepByStepAnalysis>;
  getHint(code: string): Promise<string>;
  searchTutorials(query: string): Promise<string>;
}

/**
 * 🏠 Offline Rule-Based Provider (Heuristics)
 * Handles trivial code patterns without hitting the API.
 */
class OfflineProvider implements AIProvider {
  name = 'Local Engine';

  async analyzeComplexity(code: string): Promise<AnalysisResult> {
    const cleaned = normalizeCode(code);
    
    // Pattern: Standard Library Methods (Fixed complexity)
    // - O(N log N): .sort()
    if (cleaned.includes('.sort(')) {
      return {
        complexity: 'O(N log N)',
        complexityClass: 'O(N log N)',
        spaceComplexity: 'O(log N)',
        explanationPoints: [
          'Detected a standard sorting method (usually Timsort or Quicksort).',
          'Standard comparison-based sorting has a time complexity of O(N log N).',
          'Space complexity is O(log N) for the recursion stack in most modern implementations.'
        ]
      };
    }

    // - O(N): .map(), .filter(), .reduce(), .find(), .includes()
    const linearMethods = ['.map(', '.filter(', '.reduce(', '.find(', '.includes(', '.forEach(', '.every(', '.some('];
    if (linearMethods.some(m => cleaned.includes(m))) {
      return {
        complexity: 'O(N)',
        complexityClass: 'O(N)',
        spaceComplexity: 'O(1)', // Usually O(1) unless the callback creates new data structures
        explanationPoints: [
          'Detected a standard linear iteration method.',
          'These methods visit each element of the collection exactly once.',
          'Time complexity scales linearly with the size of the input (N).'
        ]
      };
    }

    // Pattern: O(1) - Constant Time (no loops, no recursion)
    // We only call it O(1) if it's truly trivial to avoid mislabeling recursive functions.
    const hasLoops = cleaned.includes('for') || cleaned.includes('while');
    const hasFunctionCalls = (cleaned.match(/[a-zA-Z_]\w*\(/g) || [])
      .filter((m: string) => !linearMethods.includes(m) && !m.startsWith('print(') && !m.startsWith('console.')).length > 0;

    if (!hasLoops && !hasFunctionCalls) {
      return {
        complexity: 'O(1)',
        complexityClass: 'O(1)',
        spaceComplexity: 'O(1)',
        explanationPoints: [
          'The code contains only basic operations with no looping or recursive constructs.',
          'Execution time is independent of the input size.',
          'No additional space proportional to input is allocated.'
        ]
      };
    }

    // Pattern: O(N) - Linear Time (single loop)
    const loopCount = (cleaned.match(/\bfor\b|\bwhile\b/g) || []).length;
    if (loopCount === 1 && !cleaned.includes('nested')) {
      return {
        complexity: 'O(N)',
        complexityClass: 'O(N)',
        spaceComplexity: 'O(1)',
        explanationPoints: [
          'The code contains a single linear loop over the input.',
          'The number of operations scales directly with the size of the input (N).',
          'Space complexity remains O(1) as no dynamic memory is allocated based on input size.'
        ]
      };
    }

    // Pattern: O(N^2) - Quadratic Time (nested loops)
    if (loopCount === 2 && (cleaned.includes('for') && cleaned.match(/for.*for/s))) {
      return {
        complexity: 'O(N^2)',
        complexityClass: 'O(N^2)',
        spaceComplexity: 'O(1)',
        explanationPoints: [
          'Detected a nested loop structure where an inner loop runs for every iteration of an outer loop.',
          'The total number of operations is approximately proportional to N * N.',
          'Typical for algorithms like Bubble Sort or processing 2D grids.'
        ]
      };
    }

    throw new Error('Pattern too complex for local analysis.');
  }

  async analyzeStepByStep(code: string): Promise<StepByStepAnalysis> {
    throw new Error('Step-by-step analysis requires AI reasoning.');
  }

  async getHint(code: string): Promise<string> {
    const res = await this.analyzeComplexity(code).catch(() => null);
    if (!res) return 'This one looks a bit complex for a quick guess!';
    return `Local analysis suggests this is ${res.complexityClass}. Fast and efficient!`;
  }

  async searchTutorials(): Promise<string> {
    throw new Error('Search requires live API access.');
  }
}

/**
 * ♊ Gemini Provider Implementation
 */
class GeminiProvider implements AIProvider {
  name = 'Gemini';

  constructor(private ai: GoogleGenAI) {}

  async analyzeComplexity(code: string): Promise<AnalysisResult> {
    const promptText = `Analyze the following code and provide its time and space complexity. Provide a clear, straightforward, and mathematical explanation of how the algorithm works and why it has that complexity. Do not use a story-like or whimsical tone. Structure the explanation as a precise list of points.\n\nCode:\n${code}`;
    const generationConfig = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          complexity: { type: Type.STRING },
          complexityClass: { type: Type.STRING },
          spaceComplexity: { type: Type.STRING },
          explanationPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['complexity', 'complexityClass', 'spaceComplexity', 'explanationPoints']
      }
    };
    const response = await this.callWithFallback(promptText, generationConfig);
    return JSON.parse(response) as AnalysisResult;
  }

  async analyzeStepByStep(code: string): Promise<StepByStepAnalysis> {
    const promptText = `Analyze the following code step-by-step and provide its time and space complexity. Break the code down into logical blocks or lines. For each block, provide the code snippet, its specific time complexity, and a mathematical explanation of why. Finally, provide the overall time and space complexity.\n\nCode:\n${code}`;
    const generationConfig = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallTimeComplexity: { type: Type.STRING },
          overallSpaceComplexity: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                codeSnippet: { type: Type.STRING },
                timeComplexity: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ['codeSnippet', 'timeComplexity', 'explanation']
            }
          }
        },
        required: ['overallTimeComplexity', 'overallSpaceComplexity', 'steps']
      }
    };
    const response = await this.callWithFallback(promptText, generationConfig);
    return JSON.parse(response) as StepByStepAnalysis;
  }

  async getHint(code: string): Promise<string> {
    const response = await this.callWithFallback(
      `Give a very short, 1-sentence whimsical hint about the time complexity of this code:\n\n${code}`
    );
    return response || 'Hmm, this code is quite mysterious!';
  }

  async searchTutorials(query: string): Promise<string> {
    try {
      const resp = await (this.ai as any).models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [{ role: 'user', parts: [{ text: `Search for the latest information and tutorials about: ${query}. Provide a short, engaging summary and list 3 key concepts to learn.` }] }],
        tools: [{ googleSearchRetrieval: {} } as any]
      });
      return (resp as any).text || 'Could not find tutorials.';
    } catch (e: any) {
      console.warn('[Gemini] Search tool failed, trying standard call...');
      return await this.callWithFallback(`Explain ${query} with 3 key concepts.`);
    }
  }

  private async callWithFallback(promptText: string, config: any = {}): Promise<string> {
    const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError: any;
    for (const modelName of models) {
      try {
        const result = await (this.ai as any).models.generateContent({
          model: modelName,
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config,
        });
        return (result as any).text || '';
      } catch (err: any) {
        lastError = err;
        const msg = (err.message || '').toLowerCase();
        if (err.status === 404 || msg.includes('not found') || msg.includes('not supported')) continue;
        throw err;
      }
    }
    throw lastError;
  }
}

/**
 * ⚡ Groq Provider Implementation (Llama 3.3 70B)
 */
class GroqProvider implements AIProvider {
  name = 'Groq';
  private model = 'llama-3.3-70b-versatile';

  constructor(private client: OpenAI) {}

  async analyzeComplexity(code: string): Promise<AnalysisResult> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ 
        role: 'user', 
        content: `Analyze the following code and return its time/space complexity in strict JSON format.
        JSON Structure: { "complexity": string, "complexityClass": "O(1)" | "O(log N)" | "O(N)" | "O(N log N)" | "O(N^2)" | "O(2^N)" | "O(N!)" | "Unknown", "spaceComplexity": string, "explanationPoints": string[] }
        
        Code:
        ${code}`
      }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}') as AnalysisResult;
  }

  async analyzeStepByStep(code: string): Promise<StepByStepAnalysis> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ 
        role: 'user', 
        content: `Analyze the following code step-by-step and return strict JSON.
        JSON Structure: { "overallTimeComplexity": string, "overallSpaceComplexity": string, "steps": [{ "codeSnippet": string, "timeComplexity": string, "explanation": string }] }
        
        Code:
        ${code}`
      }],
      response_format: { type: 'json_object' }
    });
    return JSON.parse(response.choices[0].message.content || '{}') as StepByStepAnalysis;
  }

  async getHint(code: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ 
        role: 'user', 
        content: `Give a very short, 1-sentence whimsical hint about the time complexity of this code:\n\n${code}`
      }]
    });
    return response.choices[0].message.content || 'Mysterious code detected!';
  }

  async searchTutorials(query: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [{ 
        role: 'user', 
        content: `Provide a short, engaging summary and list 3 key concepts for this topic: ${query}`
      }]
    });
    return response.choices[0].message.content || 'Could not find tutorials.';
  }
}

/**
 * 📦 Persistent Cache Layer
 */
class PersistentCache {
  private static PREFIX = 'TimeComplexityAI_cache_';
  
  private static hash(str: string): string {
    const normalized = normalizeCode(str); // Normalize BEFORE hashing
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
  }

  static get<T>(key: string, type: string): T | null {
    if (typeof window === 'undefined') return null;
    const fullKey = `${this.PREFIX}${type}_${this.hash(key)}`;
    const stored = localStorage.getItem(fullKey);
    if (!stored) return null;
    try {
      return JSON.parse(stored) as T;
    } catch {
      return null;
    }
  }

  static set(key: string, type: string, value: any) {
    if (typeof window === 'undefined') return;
    const fullKey = `${this.PREFIX}${type}_${this.hash(key)}`;
    localStorage.setItem(fullKey, JSON.stringify(value));
  }
}

/**
 * 🔄 Key Manager & Orchestrator
 */
class AIOrchestrator {
  private geminiKeys: string[] = [];
  private currentGeminiIndex = 0;
  private groqKeys: string[] = [];
  private currentGroqIndex = 0;
  private cooldowns: Map<string, number> = new Map();
  private localEngine = new OfflineProvider();

  constructor() {
    const gKeys = getEnv('VITE_GEMINI_API_KEY');
    if (gKeys) {
      this.geminiKeys = gKeys.split(',').map(k => k.trim()).filter(Boolean);
    }
    const qKeys = getEnv('VITE_GROQ_API_KEY');
    if (qKeys) {
      this.groqKeys = qKeys.split(',').map(k => k.trim()).filter(Boolean);
    }

    if (typeof window !== 'undefined') {
      console.log(`[AIOrchestrator] 🚀 Initialized with ${this.geminiKeys.length} Gemini keys and ${this.groqKeys.length} Groq keys.`);
      if (this.geminiKeys.length === 0 && this.groqKeys.length === 0) {
        console.error('[AIOrchestrator] ❌ CRITICAL: No API keys found! Analysis will fail.');
      }
    }
  }

  async runAction<T>(type: string, input: string, action: (provider: AIProvider) => Promise<T>): Promise<T> {
    // 1. Try Local Engine first (Rules)
    if (type === 'complexity' || type === 'hint') {
      try {
        const localResult = await action(this.localEngine);
        console.log('[AI] 🏠 Local match found!');
        return localResult;
      } catch {
        // Continue to cache
      }
    }

    // 2. Try Cache
    const cached = PersistentCache.get<T>(input, type);
    if (cached) {
      console.log(`[AI] 📦 Cache hit for ${type}!`);
      return cached;
    }

    // 3. Try Gemini pool
    let result: T | null = null;
    if (this.geminiKeys.length > 0) {
      for (let i = 0; i < this.geminiKeys.length; i++) {
        const idx = (this.currentGeminiIndex + i) % this.geminiKeys.length;
        const key = this.geminiKeys[idx];
        
        if (this.isCooldown(key)) continue;

        try {
          const ai = new GoogleGenAI({ apiKey: key, apiVersion: 'v1beta' });
          const provider = new GeminiProvider(ai);
          result = await action(provider);
          this.currentGeminiIndex = (idx + 1) % this.geminiKeys.length;
          break;
        } catch (err: any) {
          console.warn(`[AI] Gemini key [${idx}] failed. Error: ${err.message}`);
          if (this.isQuotaError(err)) {
            console.error(`[AI] ⛔ Gemini key [${idx}] quota reached. Putting on cooldown...`);
            this.setCooldown(key);
            continue;
          }
          throw err;
        }
      }
    }

    // 4. Try Groq pool as fallback
    if (!result && this.groqKeys.length > 0) {
      for (let i = 0; i < this.groqKeys.length; i++) {
        const idx = (this.currentGroqIndex + i) % this.groqKeys.length;
        const key = this.groqKeys[idx];

        if (this.isCooldown(key)) continue;

        try {
          console.log(`[AI] Attempting Groq fallback (key ${idx})...`);
          const client = new OpenAI({ 
            apiKey: key, 
            baseURL: 'https://api.groq.com/openai/v1',
            dangerouslyAllowBrowser: true 
          });
          const provider = new GroqProvider(client);
          result = await action(provider);
          this.currentGroqIndex = (idx + 1) % this.groqKeys.length;
          break;
        } catch (err: any) {
          console.warn(`[AI] Groq key [${idx}] failed: ${err.message}`);
          if (this.isQuotaError(err)) {
            console.error(`[AI] ⛔ Groq key [${idx}] quota reached. Putting on cooldown...`);
            this.setCooldown(key);
            continue;
          }
          throw err;
        }
      }
    }

    if (result) {
      PersistentCache.set(input, type, result);
      return result;
    }

    throw new Error('All AI providers exhausted or unavailable. Please check your API quotas.');
  }

  private isQuotaError(err: any): boolean {
    const msg = (err.message || '').toLowerCase();
    const status = err.status || err.statusCode || 0;
    return status === 429 || msg.includes('quota') || msg.includes('rate limit');
  }

  private isCooldown(key: string): boolean {
    return (this.cooldowns.get(key) || 0) > Date.now();
  }

  private setCooldown(key: string) {
    this.cooldowns.set(key, Date.now() + 60 * 1000); // 1 min cooldown
  }
}

const orchestrator = new AIOrchestrator();

/**
 * 🛠️ Exported UI Hooks
 */

const COMPLEXITY_CLASS_ALIASES: Record<string, string> = {
  'constant': 'O(1)', 'o(1)': 'O(1)',
  'logarithmic': 'O(log N)', 'o(log n)': 'O(log N)',
  'linear': 'O(N)', 'o(n)': 'O(N)',
  'linearithmic': 'O(N log N)', 'o(n log n)': 'O(N log N)',
  'quadratic': 'O(N^2)', 'o(n^2)': 'O(N^2)',
  'exponential': 'O(2^N)', 'o(2^n)': 'O(2^N)',
  'factorial': 'O(N!)', 'o(n!)': 'O(N!)',
  'unknown': 'Unknown',
};

function normalizeResult(res: AnalysisResult): AnalysisResult {
  const cls = (res.complexityClass || 'Unknown').trim().toLowerCase();
  res.complexityClass = COMPLEXITY_CLASS_ALIASES[cls] || res.complexityClass;
  return res;
}

export const analyzeCodeComplexity = async (code: string) => 
  orchestrator.runAction('complexity', code, async (p) => normalizeResult(await p.analyzeComplexity(code)));

export const analyzeCodeStepByStep = async (code: string) => 
  orchestrator.runAction('step', code, async (p) => await p.analyzeStepByStep(code));

export const fastCodeHint = async (code: string) => 
  orchestrator.runAction('hint', code, async (p) => await p.getHint(code));

export const searchTutorials = async (query: string) => 
  orchestrator.runAction('search', query, async (p) => await p.searchTutorials(query));
