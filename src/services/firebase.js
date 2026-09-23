/**
 * S.U.T.R.A. Firebase SDK Initialisation Stub
 * ─────────────────────────────────────────────
 * This file documents the exact Firebase initialisation sequence
 * required to connect the frontend to production Firestore, Auth,
 * and Storage when credentials are available.
 *
 * STATUS: Stub — all SDK imports are commented out. The app runs
 * entirely on localStorage + mock data until this is wired.
 *
 * TO ACTIVATE:
 *   1. Create a Firebase project at https://console.firebase.google.com
 *   2. Register a Web App and copy the config object below
 *   3. Enable Authentication (Email/Password + Google Sign-In)
 *   4. Create a Firestore database in production mode
 *   5. Enable Firebase Storage
 *   6. Un-comment ALL lines in this file
 *   7. Add each firebaseConfig value to your .env as VITE_FIREBASE_*
 */

// ── SDK Imports (un-comment when activating) ────────────────────────────────
// import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getAuth, connectAuthEmulator } from 'firebase/auth';
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// import { getStorage, connectStorageEmulator } from 'firebase/storage';

// ── Firebase Configuration ───────────────────────────────────────────────────
// Replace each value with your project's actual credentials from
// Firebase Console → Project Settings → Your Apps → SDK setup
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'TODO',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'TODO',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'TODO',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'TODO',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| 'TODO',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || 'TODO',
};

// ── App Initialisation (singleton-safe) ─────────────────────────────────────
// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ── Service Instances ────────────────────────────────────────────────────────
// export const auth      = getAuth(app);
// export const firestore = getFirestore(app);
// export const storage   = getStorage(app);

// ── Local Emulator Support (development only) ────────────────────────────────
// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
//   connectFirestoreEmulator(firestore, 'localhost', 8080);
//   connectStorageEmulator(storage, 'localhost', 9199);
// }

// ── Firestore Collection References ─────────────────────────────────────────
// import { collection } from 'firebase/firestore';
// export const projectsCol = collection(firestore, 'projects');
// export const sourcesCol  = collection(firestore, 'sources');
// export const usersCol    = collection(firestore, 'users');

// ── Exported placeholder so importing this file doesn't crash ────────────────
// Remove this export block once the real exports above are activated.
export const _stubFirebaseConfig = firebaseConfig;

/**
 * Firestore Data Schemas (reference)
 *
 * /projects/{projectId}
 * ├── id:               string
 * ├── operatorUid:      string          (Firebase Auth UID)
 * ├── title:            string
 * ├── source_name:      string
 * ├── source_format:    string
 * ├── source_text:      string
 * ├── word_count:       number
 * ├── config:           { tone, target_audience, language, detail_level, objective }
 * ├── selected_formats: string[]
 * ├── analysis:         { main_topic, summary, key_facts[], key_messages[], entities, ... }
 * ├── outputs:          { executive_summary, government_advisory, linkedin_post, ... }
 * ├── status:           'Generating' | 'Verified' | 'Archived'
 * └── created_at:       Timestamp
 *
 * /users/{uid}
 * ├── name:             string
 * ├── email:            string
 * ├── organization:     string
 * ├── role:             string
 * └── preferences:      { theme, language, tone, defaultAudience }
 */
