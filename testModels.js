
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

async function listModels() {
  const key = (process.env.VITE_GEMINI_API_KEY || '').split(',')[0];
  if (!key) return console.error('No API key found');

  console.log(`Testing with key: ${key.substring(0, 8)}...`);
  const ai = new GoogleGenAI({ apiKey: key, apiVersion: 'v1beta' });

  try {
    // In @google/genai, models are sometimes accessible via a specific method
    // But they don't have a direct "list" method in the simple client sometimes.
    // Let's try to generate with different model strings.

    console.log(`\n--- Listing available models ---`);
    try {
      const resp = await ai.models.list();
      console.log(`Found ${resp.models.length} models.`);
      resp.models.slice(0, 10).forEach(m => console.log(` - ${m.name} (${m.displayName})`));
    } catch (e) {
      console.error(`Failed to list models: ${e.message}`);
    }

    const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

    for (const modelName of models) {
      console.log(`\n--- Testing model: ${modelName} ---`);
      try {
        const response = await ai.generateContent({
          model: modelName,
          contents: "Hello"
        });
        console.log(`✅ Success with ${modelName}: ${response.text.substring(0, 20)}...`);
      } catch (err) {
        console.error(`❌ Failed with ${modelName}: ${err.message}`);
        if (err.status) console.error(`Status: ${err.status}`);
      }
    }
  } catch (err) {
    console.error(`Fatal error: ${err.message}`);
  }
}

listModels();
