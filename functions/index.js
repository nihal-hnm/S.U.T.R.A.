/**
 * S.U.T.R.A. Cloud Functions — Main Entry Point
 * ─────────────────────────────────────────────────────────────────────────────
 * Express-based HTTP server exported as a single Firebase Cloud Function.
 *
 * Endpoints:
 *   POST   /api/sources           — Create source + trigger Gemini analysis
 *   GET    /api/sources           — List user sources
 *   POST   /api/projects          — Generate all requested output formats
 *   GET    /api/projects/:id      — Fetch project with all outputs
 *   DELETE /api/projects/:id      — Delete project
 *   POST   /api/outputs/:id/regenerate — Regenerate a specific output
 *   GET    /api/me                — Get operator profile
 *   PATCH  /api/me                — Update operator profile
 */

'use strict';

const { onRequest } = require('firebase-functions/v2/https');
const { initializeApp, getApps } = require('firebase-admin/app');
const express = require('express');
const cors = require('cors');

// ── Firebase Admin Initialisation (singleton-safe) ───────────────────────────
if (!getApps().length) {
  initializeApp();
}

// ── Express App ───────────────────────────────────────────────────────────────
const app = express();

// CORS — allow the Vite dev server and any Firebase Hosting origin
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  /\.web\.app$/,
  /\.firebaseapp\.com$/,
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Security headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// JSON body parser (max 25 MB for document uploads)
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: false, limit: '25mb' }));

// ── Route Handlers ────────────────────────────────────────────────────────────
const { analyzeSources, listSources } = require('./src/sources/analyze');
const { generateProject, getProject, deleteProject } = require('./src/projects/generate');
const { regenerateOutput } = require('./src/outputs/regenerate');
const { getMe, updateMe } = require('./src/users/me');
const requireAuth = require('./src/middleware/requireAuth');

// Sources
app.post('/api/sources', requireAuth, analyzeSources);
app.get('/api/sources', requireAuth, listSources);

// Projects
app.post('/api/projects', requireAuth, generateProject);
app.get('/api/projects/:id', requireAuth, getProject);
app.delete('/api/projects/:id', requireAuth, deleteProject);

// Outputs
app.post('/api/outputs/:id/regenerate', requireAuth, regenerateOutput);

// User profile
app.get('/api/me', requireAuth, getMe);
app.patch('/api/me', requireAuth, updateMe);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'S.U.T.R.A. Cloud Functions', ts: new Date().toISOString() });
});

// ── 404 catch-all ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ── Global error handler ──────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[S.U.T.R.A. Functions Error]', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal server error' });
});

// ── Firebase Cloud Function export ────────────────────────────────────────────
exports.api = onRequest(
  {
    region: 'us-central1',
    memory: '512MiB',
    timeoutSeconds: 120,
    minInstances: 0,
  },
  app
);
