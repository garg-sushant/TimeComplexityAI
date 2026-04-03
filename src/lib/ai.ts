import { GoogleGenAI, Type } from '@google/genai';
import { OpenAI } from 'openai';
import { getEnv } from '../utils/env';
import { AnalysisResult, StepByStepAnalysis } from '../types';

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
 * ♊ Gemini Provider Implementation
 */
class GeminiProvider implements AIProvider {
  name = 'Gemini';

  constructor(private ai: GoogleGenAI) {}

  async analyzeComplexity(code: string): Promise<AnalysisResult> {
    const promptText = `Analyze the following code and provide its time and space complexity. Provide a clear, straightforward, and mathematical explanation of how the algorithm works and why it has that complexity. Do not use a story-like or whimsical tone. Structure the explanation as a precise list of points.\n\nCode:\n${code}`;
    const config = {
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
    const response = await this.callWithFallback(promptText, config);
    return JSON.parse(response) as AnalysisResult;
  }

  async analyzeStepByStep(code: string): Promise<StepByStepAnalysis> {
    const promptText = `Analyze the following code step-by-step and provide its time and space complexity. Break the code down into logical blocks or lines. For each block, provide the code snippet, its specific time complexity, and a mathematical explanation of why. Finally, provide the overall time and space complexity.\n\nCode:\n${code}`;
    const config = {
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
    const response = await this.callWithFallback(promptText, config);
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
        config: {
          tools: [{ googleSearch: {} } as any]
        }
      });
      return resp.text || 'Could not find tutorials.';
    } catch (e: any) {
      console.warn('[Gemini] Search tool failed, trying standard call...');
      return await this.callWithFallback(`Explain ${query} with 3 key concepts.`);
    }
  }

  /**
   * Gemini SDK specific: Uses ai.models.generateContent to support various versions smoothly.
   */
  private async callWithFallback(promptText: string, config: any = {}): Promise<string> {
    const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
    let lastError: any;
    for (const model of models) {
      try {
        const result = await (this.ai as any).models.generateContent({
          model,
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config,
        });
        return result.text || '';
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
 * 🔄 Key Manager & Orchestrator
 */
class AIOrchestrator {
  private geminiKeys: string[] = [];
  private currentGeminiIndex = 0;
  private groqKeys: string[] = [];
  private currentGroqIndex = 0;
  private cooldowns: Map<string, number> = new Map();

  constructor() {
    const gKeys = getEnv('VITE_GEMINI_API_KEY');
    if (gKeys) {
      this.geminiKeys = gKeys.split(',').map(k => k.trim()).filter(Boolean);
    }
    const qKeys = getEnv('VITE_GROQ_API_KEY');
    if (qKeys) {
      this.groqKeys = qKeys.split(',').map(k => k.trim()).filter(Boolean);
    }

    // 🪵 Diagnostic Logging (Helpful for troubleshooting production issues)
    console.log(`[AIOrchestrator] 🚀 Initialized with ${this.geminiKeys.length} Gemini keys and ${this.groqKeys.length} Groq keys.`);
    if (this.geminiKeys.length === 0 && this.groqKeys.length === 0) {
      console.error('[AIOrchestrator] ❌ CRITICAL: No API keys found! Analysis will fail.');
    }
  }

  async runAction<T>(action: (provider: AIProvider) => Promise<T>): Promise<T> {
    // 1. Try Gemini pool first
    if (this.geminiKeys.length > 0) {
      for (let i = 0; i < this.geminiKeys.length; i++) {
        const idx = (this.currentGeminiIndex + i) % this.geminiKeys.length;
        const key = this.geminiKeys[idx];
        
        if (this.isCooldown(key)) continue;

        try {
          const ai = new GoogleGenAI({ apiKey: key, apiVersion: 'v1beta' });
          const provider = new GeminiProvider(ai);
          const result = await action(provider);
          this.currentGeminiIndex = (idx + 1) % this.geminiKeys.length;
          return result;
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

    // 2. Try Groq pool as fallback
    if (this.groqKeys.length > 0) {
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
          const result = await action(provider);
          this.currentGroqIndex = (idx + 1) % this.groqKeys.length;
          return result;
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
  orchestrator.runAction(async (p) => normalizeResult(await p.analyzeComplexity(code)));

export const analyzeCodeStepByStep = async (code: string) => 
  orchestrator.runAction(async (p) => await p.analyzeStepByStep(code));

export const fastCodeHint = async (code: string) => 
  orchestrator.runAction(async (p) => await p.getHint(code));

export const searchTutorials = async (query: string) => 
  orchestrator.runAction(async (p) => await p.searchTutorials(query));
