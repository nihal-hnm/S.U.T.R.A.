/**
 * S.U.T.R.A. Frontend API Service (§15.5 PRD Compliance)
 * --------------------------------------------------------
 * This module is the single authoritative layer for all backend
 * communication. Currently operates in "mock passthrough" mode —
 * every function resolves with sample/mock data so the frontend
 * can be demonstrated without a live backend.
 *
 * TO WIRE TO PRODUCTION:
 *   1. Set VITE_API_BASE_URL in your .env file
 *   2. Un-comment the Firebase import and token retrieval
 *   3. Replace each mock return with the real fetch() call
 */

// import { getAuth } from 'firebase/auth';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Retrieve a fresh Firebase ID token for authenticated requests.
 * Returns null in mock mode.
 */
async function getIdToken() {
  // const auth = getAuth();
  // const user = auth.currentUser;
  // if (!user) throw new Error('No authenticated user');
  // return user.getIdToken();
  return null; // Mock mode: no token required
}

/**
 * Shared fetch wrapper — attaches Authorization header and handles
 * JSON parsing + error normalisation.
 */
async function apiFetch(path, options = {}) {
  const token = await getIdToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API error: ${response.status}`);
  }

  return response.json();
}

// ─────────────────────────────────────────────────────────
// SOURCES
// ─────────────────────────────────────────────────────────

/**
 * List all sources for the current operator.
 * PRODUCTION: GET /api/sources
 * @returns {Promise<Array>} Array of source objects
 */
export async function listSources() {
  // return apiFetch('/sources');

  // MOCK PASSTHROUGH ↓
  const { SAMPLE_PROJECTS } = await import('./sampleData.js');
  return SAMPLE_PROJECTS.map((p) => ({
    id: p.id,
    name: p.source_name,
    format: p.source_format,
    createdAt: p.created_at,
    wordCount: p.word_count,
  }));
}

/**
 * Analyze a raw source document through the NLP pipeline.
 * PRODUCTION: POST /api/sources/:id/analyze
 * @param {string} sourceId
 * @returns {Promise<Object>} Analysis result matching Firestore schema
 */
export async function analyzeSource(sourceId) {
  // return apiFetch(`/sources/${sourceId}/analyze`, { method: 'POST' });

  // MOCK PASSTHROUGH ↓
  const { SAMPLE_PROJECTS } = await import('./sampleData.js');
  const proj = SAMPLE_PROJECTS.find((p) => p.id === sourceId);
  if (!proj) throw new Error(`Source ${sourceId} not found`);
  return proj.analysis;
}

// ─────────────────────────────────────────────────────────
// PROJECTS / GENERATION
// ─────────────────────────────────────────────────────────

/**
 * Trigger generation of all selected output formats for a project.
 * PRODUCTION: POST /api/projects/:id/generate
 * @param {string} projectId
 * @param {Object} config   Generation configuration (tone, audience, etc.)
 * @returns {Promise<Object>} Generated project with outputs
 */
export async function generateOutputs(projectId, config) {
  // return apiFetch(`/projects/${projectId}/generate`, {
  //   method: 'POST',
  //   body: JSON.stringify(config),
  // });

  // MOCK PASSTHROUGH ↓
  const { runMockTransformation } = await import('./transformationService.js');
  return runMockTransformation({ ...config, projectId });
}

/**
 * Regenerate a specific output format with updated parameters.
 * PRODUCTION: POST /api/outputs/:id/regenerate
 * @param {string} outputId
 * @param {Object} params   { tone, detailLevel, scope }
 * @returns {Promise<Object>} Regenerated output object
 */
export async function regenerateOutput(outputId, params) {
  // return apiFetch(`/outputs/${outputId}/regenerate`, {
  //   method: 'POST',
  //   body: JSON.stringify(params),
  // });

  // MOCK PASSTHROUGH ↓
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          outputId,
          status: 'regenerated',
          timestamp: new Date().toISOString(),
          params,
        }),
      800
    )
  );
}

/**
 * Fetch a specific project by ID including all generated outputs.
 * PRODUCTION: GET /api/projects/:id
 * @param {string} projectId
 * @returns {Promise<Object>} Full project record
 */
export async function getProject(projectId) {
  // return apiFetch(`/projects/${projectId}`);

  // MOCK PASSTHROUGH ↓
  const { SAMPLE_PROJECTS } = await import('./sampleData.js');
  const proj = SAMPLE_PROJECTS.find((p) => p.id === projectId);
  if (!proj) throw new Error(`Project ${projectId} not found`);
  return proj;
}

/**
 * Delete a project by ID.
 * PRODUCTION: DELETE /api/projects/:id
 * @param {string} projectId
 * @returns {Promise<{ success: boolean }>}
 */
export async function deleteProject(projectId) {
  // return apiFetch(`/projects/${projectId}`, { method: 'DELETE' });

  // MOCK PASSTHROUGH ↓
  return { success: true, deletedId: projectId };
}

// ─────────────────────────────────────────────────────────
// USER / AUTH
// ─────────────────────────────────────────────────────────

/**
 * Fetch the current authenticated operator's profile.
 * PRODUCTION: GET /api/me
 * @returns {Promise<Object>} User profile from Firestore
 */
export async function getMe() {
  // return apiFetch('/me');

  // MOCK PASSTHROUGH ↓
  const { getStoredUser } = await import('./store.js');
  return getStoredUser();
}
