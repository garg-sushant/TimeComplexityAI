import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const multiKeys = (process.env.VITE_GEMINI_API_KEYS || '')
  .split(',')
  .map((key) => key.trim())
  .filter(Boolean);

const singleKeys = (process.env.VITE_GEMINI_API_KEY || '')
  .split(',')
  .map((key) => key.trim())
  .filter(Boolean);

const keys = [...new Set([...multiKeys, ...singleKeys])];

const models = ['gemini-3.1-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
const sampleCode = `function sum(arr) {
  let total = 0;
  for (const value of arr) {
    total += value;
  }
  return total;
}`;

async function testKey(index: number) {
  const key = keys[index];
  if (!key) {
    console.log(`KEY_${index + 1}: missing`);
    return;
  }

  console.log(`\nKEY_${index + 1}: ${key.slice(0, 8)}...`);

  const ai = new GoogleGenAI({ apiKey: key, apiVersion: 'v1beta' });

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              {
                text:
                  `Analyze the following code and return strict JSON with keys complexity, complexityClass, spaceComplexity, explanationPoints.\n\n` +
                  `Code:\n${sampleCode}`,
              },
            ],
          },
        ],
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              complexity: { type: Type.STRING },
              complexityClass: { type: Type.STRING },
              spaceComplexity: { type: Type.STRING },
              explanationPoints: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['complexity', 'complexityClass', 'spaceComplexity', 'explanationPoints'],
          },
        },
      });

      console.log(`MODEL ${model}: SUCCESS`);
      console.log(String(response.text).slice(0, 400));
      return;
    } catch (error: any) {
      const status = error?.status ?? error?.statusCode ?? error?.response?.status ?? 'NA';
      const message = String(error?.message || '').slice(0, 300);
      console.log(`MODEL ${model}: FAIL ${status} ${message}`);
    }
  }

  console.log(`KEY_${index + 1}: no model succeeded`);
}

await testKey(1);
await testKey(2);
