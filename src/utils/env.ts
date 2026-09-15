const sanitize = (val: any): string | undefined => {
  if (typeof val === 'string') {
    const trimmed = val.trim().replace(/^["']+|["']+$/g, '');
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
};

/**
 * SSR-safe utility to access environment variables.
 * In Vite (browser), it uses import.meta.env.
 * In Node.js (build/prerender), it falls back to process.env.
 */
export const getEnv = (name: string): string | undefined => {
  // 1. Check Vite's import.meta.env first (for browser/Vite bundled code)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      if (name === 'VITE_GEMINI_API_KEY') return sanitize(import.meta.env.VITE_GEMINI_API_KEY);
      if (name === 'VITE_GROQ_API_KEY') return sanitize(import.meta.env.VITE_GROQ_API_KEY);
      if (name === 'VITE_FIREBASE_API_KEY') return sanitize(import.meta.env.VITE_FIREBASE_API_KEY);
      if (name === 'VITE_FIREBASE_AUTH_DOMAIN') return sanitize(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
      if (name === 'VITE_FIREBASE_PROJECT_ID') return sanitize(import.meta.env.VITE_FIREBASE_PROJECT_ID);
      if (name === 'VITE_FIREBASE_STORAGE_BUCKET') return sanitize(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);
      if (name === 'VITE_FIREBASE_MESSAGING_SENDER_ID') return sanitize(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
      if (name === 'VITE_FIREBASE_APP_ID') return sanitize(import.meta.env.VITE_FIREBASE_APP_ID);

      const value = (import.meta.env as any)[name];
      if (value !== undefined) return sanitize(value);
    }
  } catch (e) {
    // Accessing import.meta.env might throw in some non-Vite environments
  }

  // 2. Clear fallback to process.env (for Node.js/tsx scripts)
  if (typeof process !== 'undefined' && process.env) {
    return sanitize(process.env[name]);
  }

  return undefined;
};
