/**
 * SSR-safe utility to access environment variables.
 * In Vite (browser), it uses import.meta.env.
 * In Node.js (build/prerender), it falls back to process.env.
 */
export const getEnv = (name: string): string | undefined => {
  // 1. Check Vite's import.meta.env first (for browser/Vite bundled code)
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      // Direct literal access is more reliable for Vite's static replacement
      if (name === 'VITE_GEMINI_API_KEY') return (import.meta as any).env.VITE_GEMINI_API_KEY;
      if (name === 'VITE_GROQ_API_KEY') return (import.meta as any).env.VITE_GROQ_API_KEY;
      if (name === 'VITE_FIREBASE_API_KEY') return (import.meta as any).env.VITE_FIREBASE_API_KEY;
      if (name === 'VITE_FIREBASE_AUTH_DOMAIN') return (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN;
      if (name === 'VITE_FIREBASE_PROJECT_ID') return (import.meta as any).env.VITE_FIREBASE_PROJECT_ID;
      if (name === 'VITE_FIREBASE_STORAGE_BUCKET') return (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET;
      if (name === 'VITE_FIREBASE_MESSAGING_SENDER_ID') return (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID;
      if (name === 'VITE_FIREBASE_APP_ID') return (import.meta as any).env.VITE_FIREBASE_APP_ID;

      const value = (import.meta as any).env[name];
      if (value !== undefined) return value;
    }
  } catch (e) {
    // Accessing import.meta.env might throw in some non-Vite environments
  }

  // 2. Clear fallback to process.env (for Node.js/tsx scripts)
  if (typeof process !== 'undefined' && process.env) {
    return process.env[name];
  }

  return undefined;
};
