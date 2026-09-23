import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from '../services/firebase';

/**
 * useDocument(collectionName, docId)
 * ────────────────────────────────────
 * Fetches a single Firestore document by ID.
 * Returns null data in demo mode.
 *
 * @returns {{ data: Object|null, loading: boolean, error: string|null }}
 */
export function useDocument(collectionName, docId) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !firestore || !docId) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(firestore, collectionName, docId),
      (snapshot) => {
        if (snapshot.exists()) {
          setData({ id: snapshot.id, ...snapshot.data() });
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error(`[useDocument] ${collectionName}/${docId}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, docId]);

  return { data, loading, error };
}

/**
 * useCollection(collectionName, constraints)
 * ───────────────────────────────────────────
 * Real-time listener on a Firestore collection with optional query constraints.
 * Returns empty array in demo mode.
 *
 * @param {string} collectionName
 * @param {Array}  constraints  Array of Firestore query constraints (where, orderBy, etc.)
 * @returns {{ docs: Array, loading: boolean, error: string|null }}
 */
export function useCollection(collectionName, constraints = []) {
  const [docs, setDocs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !firestore) {
      setLoading(false);
      return;
    }

    const q = query(collection(firestore, collectionName), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setDocs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error(`[useCollection] ${collectionName}:`, err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName]); // eslint-disable-line react-hooks/exhaustive-deps

  return { docs, loading, error };
}

