/**
 * S.U.T.R.A. Local Store & Firebase Model Readiness
 * Designed to mirror Cloud Firestore collections:
 * - users
 * - projects
 * - sources
 * - analyses
 * - outputs
 * - generation_history
 */

import { SAMPLE_PROJECTS } from './sampleData';

const STORAGE_KEYS = {
  PROJECTS: 'sutra_projects',
  CURRENT_USER: 'sutra_current_user',
  SETTINGS: 'sutra_settings',
  THEME: 'sutra_theme'
};

const DEFAULT_USER = {
  id: "usr-operator-01",
  name: "Dr. Rajeshwar Sharma",
  email: "operator@sutra.gov.in",
  role: "Senior Communications Specialist",
  department: "Department of Administrative Coordination & Public Information",
  designation: "Authorized Public Information Officer",
  employee_id: "GOV-IN-7842",
  clearance_level: "Level 3 (Public Broadcast & Administrative Circulars)",
  last_login: "2026-09-22T09:15:00Z",
  status: "Active - Authorized"
};

const DEFAULT_SETTINGS = {
  theme: "dark", // "dark" (Black Palette) | "light"
  default_language: "English",
  default_tone: "Professional",
  default_audience: "General Public",
  default_detail_level: "Standard",
  auto_save_drafts: true,
  two_factor_auth: true,
  audit_logging: true,
  high_contrast_mode: false
};

// Initialize projects from localStorage or default sample data
export function getStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error parsing stored projects, falling back to sample data", err);
  }
  // Initialize with sample projects
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(SAMPLE_PROJECTS));
  return SAMPLE_PROJECTS;
}

export function saveStoredProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  } catch (err) {
    console.error("Error saving projects to localStorage", err);
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_USER;
}

export function saveStoredUser(user) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

export function getStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

export function saveStoredSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

/**
 * Returns true when Firebase Firestore is live (configured + not using
 * placeholder credentials). Downstream code can use this to decide whether
 * to read from Firestore or fall back to localStorage.
 */
export function isFirestoreActive() {
  try {
    // Lazily import so this module stays free of top-level side effects
    const { isFirebaseConfigured } = require('./firebase');
    return !!isFirebaseConfigured;
  } catch {
    return false;
  }
}

/**
 * Reset demo data.
 * - Always resets localStorage to sample data.
 * - When Firestore is active, also writes sample projects to Firestore
 *   under a "__demo__" owner so they appear in the UI immediately.
 *   (Firestore writes are fire-and-forget — errors are swallowed to
 *    preserve the localStorage fallback UX.)
 */
export async function resetDemoData() {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(SAMPLE_PROJECTS));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));

  if (isFirestoreActive()) {
    try {
      const { firestore } = await import('./firebase');
      const { collection, writeBatch, doc, serverTimestamp } = await import('firebase/firestore');
      const batch = writeBatch(firestore);
      SAMPLE_PROJECTS.forEach((project) => {
        const ref = doc(collection(firestore, 'projects'), project.id);
        batch.set(ref, {
          ...project,
          ownerId:   '__demo__',
          updatedAt: serverTimestamp(),
        }, { merge: true });
      });
      await batch.commit();
      console.info('[S.U.T.R.A.] Demo data synced to Firestore.');
    } catch (firestoreErr) {
      // Non-fatal — localStorage data is already set above
      console.warn('[S.U.T.R.A.] Could not sync demo data to Firestore:', firestoreErr.message);
    }
  }

  return SAMPLE_PROJECTS;
}

