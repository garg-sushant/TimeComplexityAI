const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "VITE_FIREBASE_API_KEY": "AIzaSyBsBscJEt83Y2G39zM6201Lc6iXlELwVU0", "VITE_FIREBASE_APP_ID": "1:501144877493:web:f6c7479fdd1d1a2d43c1fc", "VITE_FIREBASE_AUTH_DOMAIN": "algo-story.firebaseapp.com", "VITE_FIREBASE_MESSAGING_SENDER_ID": "501144877493", "VITE_FIREBASE_PROJECT_ID": "algo-story", "VITE_FIREBASE_STORAGE_BUCKET": "algo-story.firebasestorage.app", "VITE_GEMINI_API_KEY": "AIzaSyAxM5lR7UjmS2TGidC-ZS1KsYPtm3xQ4Og" };
const getEnv = (name) => {
  try {
    if (typeof import.meta !== "undefined" && __vite_import_meta_env__) {
      const value = __vite_import_meta_env__[name];
      if (value !== void 0) return value;
    }
  } catch (e) {
  }
  if (typeof process !== "undefined" && process.env) {
    return process.env[name];
  }
  return void 0;
};
export {
  getEnv as g
};
