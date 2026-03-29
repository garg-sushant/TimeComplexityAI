/**
 * SSR-safe utility to access environment variables.
 * In Vite (browser), it uses import.meta.env.
 * In Node.js (build/prerender), it falls back to process.env.
 */
export const getEnv = (name: string): string | undefined => {
  // 1. Check Vite's import.meta.env first (for browser/Vite bundled code)
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
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
