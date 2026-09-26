/**
 * S.U.T.R.A. Firebase SDK Initialisation
 * ─────────────────────────────────────────────
 * Activates Firebase Auth, Firestore, and Storage when valid credentials
 * are present in environment variables. When credentials are 'TODO' or
 * missing, all exports are null and the app falls back to localStorage +
 * mock data (Phase 2 demo mode) — no crash, no broken UI.
 *
 * ENVIRONMENT VARIABLES (copy .env.example → .env.local):
 *   VITE_FIREBASE_API_KEY
 *   VITE_FIREBASE_AUTH_DOMAIN
 *   VITE_FIREBASE_PROJECT_ID
 *   VITE_FIREBASE_STORAGE_BUCKET
 *   VITE_FIREBASE_MESSAGING_SENDER_ID
 *   VITE_FIREBASE_APP_ID
 *   VITE_USE_EMULATOR=true   (optional — connect to local Firebase Emulator Suite)
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import {
  getStorage,
  connectStorageEmulator,
} from 'firebase/storage';

// ── Firebase Configuration ───────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'TODO',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'TODO',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'TODO',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'TODO',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'TODO',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'TODO',
};

// ── Configured check: all required fields must be present and non-placeholder ─
const REQUIRED_KEYS = ['apiKey', 'authDomain', 'projectId', 'appId'];
const _isConfigured = REQUIRED_KEYS.every(
  (k) => firebaseConfig[k] && firebaseConfig[k] !== 'TODO' && firebaseConfig[k].length > 4
);

export const isFirebaseConfigured = _isConfigured;

// ── App Initialisation (singleton-safe) ──────────────────────────────────────
let app = null;
let auth = null;
let firestore = null;
let storage = null;
let googleProvider = null;

if (_isConfigured) {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  firestore = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account' });

  // ── Local Emulator Support ─────────────────────────────────────────────────
  // Set VITE_USE_EMULATOR=true in .env.local to use Firebase Local Emulator Suite
  // Run: firebase emulators:start --only auth,firestore,functions,storage
  if (import.meta.env.VITE_USE_EMULATOR === 'true') {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.info('[S.U.T.R.A.] Firebase Emulator Suite connected.');
  }
} else {
  console.info(
    '[S.U.T.R.A.] Firebase not configured — running in demo/localStorage mode. ' +
    'Copy .env.example to .env.local and fill in your Firebase project credentials to activate.'
  );
}

export { app, auth, firestore, storage, googleProvider, onAuthStateChanged };

// ── Firestore Collection Name Constants ──────────────────────────────────────
export const COLLECTIONS = {
  USERS: 'users',
  PROJECTS: 'projects',
  SOURCES: 'sources',
  ANALYSES: 'analyses',
  OUTPUTS: 'outputs',
  GENERATION_HISTORY: 'generation_history',
};
