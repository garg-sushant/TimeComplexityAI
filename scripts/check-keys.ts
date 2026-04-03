import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { OpenAI } from 'openai';

dotenv.config();

const multiKeys = (process.env.VITE_GEMINI_API_KEYS || '')
  .split(',')
  .map((key) => key.trim())
  .filter(Boolean);

const singleKeys = (process.env.VITE_GEMINI_API_KEY || '')
  .split(',')
  .map((key) => key.trim())
  .filter(Boolean);

const geminiKeys = [...new Set([...multiKeys, ...singleKeys])];
const groqKeys = (process.env.VITE_GROQ_API_KEY || '')
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean);

const sampleCode = `function sum(arr) {
  let total = 0;
  for (const value of arr) {
    total += value;
  }
  return total;
}`;

async function testGemini(key: string, index: number) {
  console.log(`\n[GEMINI] Key ${index + 1}: ${key.slice(0, 8)}...`);
  const ai = new GoogleGenAI({ apiKey: key, apiVersion: 'v1beta' });
  const model = 'gemini-1.5-flash';
  
  try {
    const result = await (ai as any).models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: `Analyze strict JSON:\n${sampleCode}` }] }],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            complexity: { type: Type.STRING },
            complexityClass: { type: Type.STRING },
            spaceComplexity: { type: Type.STRING },
            explanationPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ['complexity', 'complexityClass', 'spaceComplexity', 'explanationPoints'],
        },
      },
    });

    console.log(`[GEMINI] SUCCESS: ${result.text?.slice(0, 100)}...`);
  } catch (error: any) {
    console.log(`[GEMINI] FAIL: ${error.message?.slice(0, 200)}`);
  }
}

async function testGroq(key: string, index: number) {
  console.log(`\n[GROQ] Key ${index + 1}: ${key.slice(0, 8)}...`);
  const client = new OpenAI({ 
    apiKey: key, 
    baseURL: 'https://api.groq.com/openai/v1' 
  });
  
  try {
    const response = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ 
        role: 'user', 
        content: `Analyze the following code and return its time/space complexity in strict JSON.
        JSON Structure: { "complexity": string, "complexityClass": string, "spaceComplexity": string, "explanationPoints": string[] }
        
        Code:
        ${sampleCode}`
      }],
      response_format: { type: 'json_object' }
    });
    console.log(`[GROQ] SUCCESS: ${response.choices[0].message.content?.slice(0, 100)}...`);
  } catch (error: any) {
    console.log(`[GROQ] FAIL: ${error.message?.slice(0, 200)}`);
  }
}

console.log('🚀 Starting AI Provider Diagnostics...');

for (let i = 0; i < geminiKeys.length; i++) {
  await testGemini(geminiKeys[i], i);
}

if (groqKeys.length > 0) {
  for (let i = 0; i < groqKeys.length; i++) {
    await testGroq(groqKeys[i], i);
  }
} else {
  console.log('\n[GROQ] Skip: No Groq keys found.');
}
