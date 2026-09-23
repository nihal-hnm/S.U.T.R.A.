import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  auth,
  googleProvider,
  onAuthStateChanged,
  isFirebaseConfigured,
} from '../services/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';

const AuthContext = createContext(null);

/**
 * AuthProvider
 * Wraps the app with Firebase Auth state. When Firebase is not configured
 * (demo mode), loading resolves immediately with no user — Login page then
 * handles the mock flow exactly as it did in Phase 2.
 */
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // Demo mode — skip Firebase, mark as resolved
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setUser(firebaseUser);
          setIdToken(token);
        } catch {
          setUser(firebaseUser);
          setIdToken(null);
        }
      } else {
        setUser(null);
        setIdToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  /** Email + password sign-in. Falls back to demo object when unconfigured. */
  const signIn = useCallback(async (email, password) => {
    if (!isFirebaseConfigured || !auth) {
      // Demo fallback — pretend login succeeded
      const demoUser = { uid: 'demo-uid', email, displayName: 'Demo Operator' };
      setUser(demoUser);
      return { user: demoUser };
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred;
  }, []);

  /** Google Sign-In via popup. Falls back to demo object when unconfigured. */
  const signInWithGoogle = useCallback(async () => {
    if (!isFirebaseConfigured || !auth) {
      const demoUser = { uid: 'demo-google-uid', email: 'demo@sutra.gov', displayName: 'Demo via SSO' };
      setUser(demoUser);
      return { user: demoUser };
    }
    const cred = await signInWithPopup(auth, googleProvider);
    return cred;
  }, []);

  /** Sign out from Firebase (no-op in demo mode). */
  const signOut = useCallback(async () => {
    if (isFirebaseConfigured && auth) {
      await firebaseSignOut(auth);
    }
    setUser(null);
    setIdToken(null);
  }, []);

  const value = {
    user,
    idToken,
    loading,
    signIn,
    signInWithGoogle,
    signOut,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook to consume AuthContext — must be inside AuthProvider. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

