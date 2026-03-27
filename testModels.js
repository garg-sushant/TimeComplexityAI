import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testModel(modelName) {
  try {
    const res = await ai.models.generateContent({
      model: modelName,
      contents: 'hi'
    });
    console.log(`${modelName}: SUCCESS`);
  } catch (err) {
    console.error(`${modelName}: ERROR ${err.message}`);
  }
}

async function run() {
  await testModel('gemini-2.5-flash');
  await testModel('gemini-2.5-pro');
  await testModel('gemini-3.0-flash');
  await testModel('gemini-3.1-flash');
  await testModel('gemini-1.5-pro');
  await testModel('gemini-1.5-flash');
}

run();
