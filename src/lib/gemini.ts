import { GoogleGenAI, Type } from '@google/genai';
import { getEnv } from '../utils/env';
import { AnalysisResult, StepByStepAnalysis } from '../types';

// 🗝️ Key Rotation Manager
class KeyManager {
  private keys: string[] = [];
  private currentIndex = 0;

  constructor() {
    // 1. Check for the new comma-separated list first
    const multiKeys = getEnv('VITE_GEMINI_API_KEYS');
    if (multiKeys) {
      this.keys = multiKeys.split(',').map(k => k.trim()).filter(Boolean);
    }
    
    // 2. Fallback to the single legacy key if no multi-keys provided
    if (this.keys.length === 0) {
      const singleKey = getEnv('VITE_GEMINI_API_KEY');
      if (singleKey) this.keys.push(singleKey);
    }
    
    if (this.keys.length === 0) {
      console.warn('⚠️ No Gemini API keys found in environment. AI features will fail.');
    }
  }

  public getNextInstance(): GoogleGenAI | null {
    if (this.keys.length === 0) return null;
    const key = this.keys[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.keys.length;
    return new GoogleGenAI({ apiKey: key });
  }

  public getPoolSize(): number {
    return this.keys.length;
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

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const ai = keyManager.getNextInstance();
    if (!ai) throw new Error('No Gemini API key available');

    try {
      return await fn(ai);
    } catch (error: any) {
      lastError = error;
      const status = error?.status || error?.statusCode;
      const message = error?.message?.toLowerCase() || '';

      // Check for Rate Limit (429) or Forbidden/Exhausted (403)
      const isRetryable = status === 429 || status === 403 || message.includes('quota') || message.includes('rate limit');

      if (isRetryable && attempt < maxAttempts - 1) {
        console.warn(`🔄 Gemini Key ${attempt + 1} exhausted/rate-limited. Rotating keys...`);
        continue; // Try with next key
      }
      
      throw error; // Not retryable or out of keys
    }
  }
  throw lastError;
}

export const analyzeCodeComplexity = async (code: string): Promise<AnalysisResult> => {
  return withRetry(async (ai) => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Analyze the following code and provide its time and space complexity. Provide a clear, straightforward, and mathematical explanation of how the algorithm works and why it has that complexity. Do not use a story-like or whimsical tone. Structure the explanation as a precise list of points.\n\nCode:\n${code}`,
      config: {
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
      }
    });

    const text = response.text;
    if (!text) throw new Error('No response from Gemini');
    return JSON.parse(text) as AnalysisResult;
  });
};

export const analyzeCodeStepByStep = async (code: string): Promise<StepByStepAnalysis> => {
  return withRetry(async (ai) => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Analyze the following code step-by-step and provide its time and space complexity. Break the code down into logical blocks or lines. For each block, provide the code snippet, its specific time complexity, and a mathematical explanation of why. Finally, provide the overall time and space complexity.\n\nCode:\n${code}`,
      config: {
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
      }
    });

    const text = response.text;
    if (!text) throw new Error('No response from Gemini');
    return JSON.parse(text) as StepByStepAnalysis;
  });
};

export const fastCodeHint = async (code: string): Promise<string> => {
  return withRetry(async (ai) => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Give a very short, 1-sentence whimsical hint about the time complexity of this code:\n\n${code}`,
    });
    return response.text || 'Hmm, this code is quite mysterious!';
  });
};

export const searchTutorials = async (query: string): Promise<string> => {
  return withRetry(async (ai) => {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Search for the latest information and tutorials about: ${query}. Provide a short, engaging summary and list 3 key concepts to learn.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || 'Could not find tutorials at this time.';
  });
};
