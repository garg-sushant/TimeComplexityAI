import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: 'hi',
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
      }
    });
    console.log(`SUCCESS: ${res.text}`);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
  }
}

run();
