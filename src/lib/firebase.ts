import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getEnv } from "../utils/env";

// ✅ SSR-safe env variables
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY'),
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnv('VITE_FIREBASE_APP_ID'),
};

// ✅ SSR-safe initialization: Only initialize if this is running in a browser!
const isBrowser = typeof window !== 'undefined';

let app: any;
let auth: any;
let db: any;

if (isBrowser) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
}

export { auth, db };

// ✅ Create and configure Google provider
const createGoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  return provider;
};

// ✅ Robust Google sign-in with popup primary and redirect fallback
export const signInWithGoogle = async () => {
  if (!auth) {
    const msg = "Firebase Auth is not initialized. Please ensure your .env file has valid VITE_FIREBASE_* keys.";
    console.error(msg);
    alert(msg);
    return null;
  }

  const provider = createGoogleProvider();

  try {
    // 1. Primary: signInWithPopup to preserve page state and avoid 3rd-party cookie issues
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error: any) {
    const code = error?.code || '';
    const message = error?.message || '';

    // Gracefully handle user closing popup window
    if (code === 'auth/popup-closed-by-user') {
      console.log('User closed Google sign-in popup.');
      return null;
    }

    // 2. Fallback: Automatically switch to redirect if popup was blocked by browser or environment
    if (
      code === 'auth/popup-blocked' ||
      code === 'auth/cancelled-popup-request' ||
      code === 'auth/operation-not-supported-in-this-environment'
    ) {
      console.warn('Popup blocked or unsupported. Falling back to signInWithRedirect...', error);
      try {
        await signInWithRedirect(auth, provider);
        return null;
      } catch (redirectErr: any) {
        console.error('Redirect sign-in error:', redirectErr);
        throw redirectErr;
      }
    }

    console.error("Error signing in with Google:", error);

    if (code === 'auth/unauthorized-domain') {
      alert(`Firebase Auth Error: Domain '${window.location.hostname}' is not authorized in Firebase Console.\n\nTo fix:\n1. Go to Firebase Console -> Authentication -> Settings -> Authorized domains\n2. Add '${window.location.hostname}' (e.g. localhost, 127.0.0.1, or your custom domain)`);
    } else if (code === 'auth/operation-not-allowed') {
      alert("Google Sign-In is not enabled in your Firebase project.\n\nPlease enable Google in Firebase Console -> Authentication -> Sign-in method.");
    } else if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid') {
      alert("Invalid Firebase API Key. Please verify VITE_FIREBASE_API_KEY in your .env file.");
    } else if (code === 'auth/invalid-credential' && message.includes('userinfo')) {
      alert("Google Sign-in failed (401 Unauthorized from Google userinfo API).\n\nThis typically means the OAuth Client Secret in Firebase Console is out of sync with Google Cloud Console.\n\nTo fix:\n1. Open Firebase Console -> Authentication -> Sign-in method -> Google.\n2. Expand 'Web SDK configuration'.\n3. Check the Web Client ID and Web Client Secret against Google Cloud Console -> APIs & Services -> Credentials -> OAuth 2.0 Client IDs (Web client).\n4. Ensure Google People API / Identity Toolkit API is enabled in Google Cloud Console.");
    } else {
      alert(`Login failed (${code || 'Unknown'}): ${message}`);
    }
    throw error;
  }
};

export const logOut = async () => {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
