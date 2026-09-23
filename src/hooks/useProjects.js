import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured, COLLECTIONS } from '../services/firebase';
import { getStoredProjects } from '../services/store';

/**
 * useProjects(uid)
 * ─────────────────
 * Real-time Firestore listener for the current user's projects.
 * When Firebase is not configured (demo mode), falls back to
 * localStorage via getStoredProjects() — preserving Phase 2 behavior.
 *
 * @param {string|null} uid  Firebase Auth user UID
 * @returns {{ projects: Array, loading: boolean, error: string|null }}
 */
export function useProjects(uid) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    // ── Demo / unconfigured mode ─────────────────────────────────────────────
    if (!isFirebaseConfigured || !firestore || !uid) {
      setProjects(getStoredProjects());
      setLoading(false);
      return;
    }

    // ── Live Firestore listener ──────────────────────────────────────────────
    const q = query(
      collection(firestore, COLLECTIONS.PROJECTS),
      where('ownerId', '==', uid),
      orderBy('created_at', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Firestore Timestamps → ISO strings for consistency with existing UI
          created_at: doc.data().created_at?.toDate?.()?.toISOString?.() ?? doc.data().created_at,
        }));
        setProjects(docs);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('[useProjects] Firestore error:', err);
        setError(err.message);
        // Fall back to cached data so the UI doesn't break
        setProjects(getStoredProjects());
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [uid]);

  return { projects, loading, error };
}

