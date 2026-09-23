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

export function resetDemoData() {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(SAMPLE_PROJECTS));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USER));
  return SAMPLE_PROJECTS;
}
