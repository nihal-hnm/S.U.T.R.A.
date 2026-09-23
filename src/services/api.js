/**
 * S.U.T.R.A. Frontend API Service
 * ─────────────────────────────────────────────────────────────────────
 * Single authoritative layer for all backend communication.
 *
 * MODES:
 *   Configured (VITE_FIREBASE_* set):  calls real Cloud Function endpoints
 *                                       with Firebase ID token in Bearer header
 *   Demo (vars missing or 'TODO'):     mock passthrough — returns sample data,
 *                                       app runs exactly as in Phase 2
 *
 * ENVIRONMENT:
 *   VITE_API_BASE_URL  — Cloud Functions base URL or '/api' proxy
 *                        e.g. https://us-central1-my-project.cloudfunctions.net/api
 */

import { auth, isFirebaseConfigured } from './firebase';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Returns true when Firebase is configured and real API calls should be made.
 */
function isConfigured() {
  return isFirebaseConfigured;
}

/**
 * Get a fresh Firebase ID token for authenticated requests.
 * Returns null in demo mode.
 */
async function getIdToken() {
  if (!isConfigured() || !auth?.currentUser) return null;
  try {
    return await auth.currentUser.getIdToken();
  } catch {
    return null;
  }
}

/**
 * Shared fetch wrapper — attaches Authorization header and handles
 * JSON parsing + structured error normalisation.
 *
 * @throws {Error} with human-readable message on non-ok response
 */
async function apiFetch(path, options = {}) {
  const token = await getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch (networkErr) {
    throw new Error(`Network error — check your connection and try again.`);
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    // Map common HTTP status codes to user-friendly messages
    const msgMap = {
      400: body.message || 'Invalid request. Please check your input.',
      401: 'Your session has expired. Please log in again.',
      403: 'Access denied. You do not have permission for this action.',
      413: 'File is too large. Maximum upload size is 25 MB.',
      415: 'Unsupported file type. Please use PDF, DOCX, TXT, PNG, JPG, or MP4.',
      429: 'Too many requests. Please wait a moment and try again.',
      500: body.message || 'Server error. Our team has been notified.',
      503: 'Service temporarily unavailable. Please retry in a few seconds.',
    };
    throw new Error(msgMap[response.status] || body.message || `API error ${response.status}`);
  }

  return response.json();
}

// ─────────────────────────────────────────────────────────
// SOURCES
// ─────────────────────────────────────────────────────────

/**
 * Create a source document and trigger NLP analysis.
 * PRODUCTION: POST /api/sources
 * @param {{ sourceText: string, sourceName: string, sourceType: string }} payload
 * @returns {Promise<{ sourceId: string, analysis: Object }>}
 */
export async function createSource(payload) {
  if (!isConfigured()) {
    // Demo mode fallback
    const { generateAnalysisFromText } = await import('./transformationService');
    return {
      sourceId: `src-${Date.now().toString(36)}`,
      analysis: generateAnalysisFromText
        ? generateAnalysisFromText(payload.sourceText, { target_audience: 'General Public', tone: 'Professional' })
        : {},
    };
  }
  return apiFetch('/sources', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * Upload a file source (multipart). Falls back to text path in demo mode.
 * PRODUCTION: POST /api/sources (multipart/form-data)
 * @param {FormData} formData
 * @returns {Promise<{ sourceId: string, analysis: Object }>}
 */
export async function createSourceFromFile(formData) {
  if (!isConfigured()) {
    return { sourceId: `src-${Date.now().toString(36)}`, analysis: {} };
  }
  const token = await getIdToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  // Note: do NOT set Content-Type for FormData — browser sets it with boundary
  let response;
  try {
    response = await fetch(`${API_BASE}/sources`, { method: 'POST', headers, body: formData });
  } catch {
    throw new Error('Network error — check your connection and try again.');
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const msgMap = { 413: 'File is too large. Maximum 25 MB.', 415: 'Unsupported file type.' };
    throw new Error(msgMap[response.status] || body.message || `Upload failed: ${response.status}`);
  }
  return response.json();
}

/**
 * List all sources for the current operator.
 * PRODUCTION: GET /api/sources
 */
export async function listSources() {
  if (!isConfigured()) {
    const { SAMPLE_PROJECTS } = await import('./sampleData.js');
    return SAMPLE_PROJECTS.map((p) => ({
      id: p.id,
      name: p.source_name,
      format: p.source_format,
      createdAt: p.created_at,
      wordCount: p.word_count,
    }));
  }
  return apiFetch('/sources');
}

// ─────────────────────────────────────────────────────────
// PROJECTS / GENERATION
// ─────────────────────────────────────────────────────────

/**
 * Trigger generation of all selected output formats for a project.
 * PRODUCTION: POST /api/projects
 * @param {{ sourceId, title, selectedFormats, config }} payload
 * @returns {Promise<Object>} Generated project with outputs
 */
export async function generateProject(payload) {
  if (!isConfigured()) {
    const { runMockTransformation } = await import('./transformationService.js');
    return runMockTransformation({
      sourceText: payload.sourceText || '',
      sourceName: payload.sourceName || 'Source_Document.txt',
      sourceType: payload.sourceType || 'text',
      selectedFormats: payload.selectedFormats,
      config: payload.config,
      onProgress: payload.onProgress || (() => {}),
    });
  }
  return apiFetch('/projects', {
    method: 'POST',
    body: JSON.stringify({
      sourceId:        payload.sourceId,
      title:           payload.title,
      selected_formats: payload.selectedFormats,
      config:          payload.config,
    }),
  });
}

/**
 * Regenerate a specific output format with updated parameters.
 * PRODUCTION: POST /api/outputs/:id/regenerate
 * @param {string} projectId
 * @param {{ tone: string, detailLevel: string, scope: string, format: string }} params
 * @returns {Promise<Object>} Project with regenerated outputs
 */
export async function regenerateOutput(projectId, params) {
  if (!isConfigured()) {
    // Demo: simulate a short delay then return success signal
    return new Promise((resolve) =>
      setTimeout(() => resolve({ projectId, status: 'regenerated', params }), 900)
    );
  }
  return apiFetch(`/outputs/${projectId}/regenerate`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

/**
 * Fetch a specific project by ID including all generated outputs.
 * PRODUCTION: GET /api/projects/:id
 */
export async function getProject(projectId) {
  if (!isConfigured()) {
    const { SAMPLE_PROJECTS } = await import('./sampleData.js');
    const proj = SAMPLE_PROJECTS.find((p) => p.id === projectId);
    if (!proj) throw new Error(`Project ${projectId} not found`);
    return proj;
  }
  return apiFetch(`/projects/${projectId}`);
}

/**
 * Delete a project by ID.
 * PRODUCTION: DELETE /api/projects/:id
 */
export async function deleteProject(projectId) {
  if (!isConfigured()) {
    return { success: true, deletedId: projectId };
  }
  return apiFetch(`/projects/${projectId}`, { method: 'DELETE' });
}

// ─────────────────────────────────────────────────────────
// USER / AUTH
// ─────────────────────────────────────────────────────────

/**
 * Fetch or create the current authenticated operator's profile.
 * PRODUCTION: GET /api/me
 */
export async function getMe() {
  if (!isConfigured()) {
    const { getStoredUser } = await import('./store.js');
    return getStoredUser();
  }
  return apiFetch('/me');
}

/**
 * Update the current operator's profile.
 * PRODUCTION: PATCH /api/me
 */
export async function updateMe(updates) {
  if (!isConfigured()) {
    return updates;
  }
  return apiFetch('/me', {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
}



