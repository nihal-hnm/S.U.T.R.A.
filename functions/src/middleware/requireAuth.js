/**
 * S.U.T.R.A. Auth Middleware
 * ─────────────────────────────────────────────────────────────────────────────
 * Validates the Firebase ID token from the Authorization: Bearer <token> header.
 * Attaches the decoded token payload to req.user for downstream handlers.
 *
 * Responds with 401 if:
 *   - No Authorization header is present
 *   - The token is malformed or expired
 *   - The Firebase Admin SDK cannot verify the token
 */

'use strict';

const { getAuth } = require('firebase-admin/auth');

/**
 * Express middleware that validates a Firebase ID token.
 * @type {import('express').RequestHandler}
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing or malformed Authorization header. Expected: Bearer <token>',
    });
  }

  const idToken = authHeader.slice(7); // strip "Bearer "

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);
    // Attach decoded claims to request for use in handlers
    req.user = {
      uid:   decodedToken.uid,
      email: decodedToken.email || null,
      name:  decodedToken.name  || null,
    };
    next();
  } catch (err) {
    console.warn('[requireAuth] Token verification failed:', err.code, err.message);

    // Distinguish between expired tokens and genuinely invalid tokens
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({
        error: 'TokenExpired',
        message: 'Your session has expired. Please log in again.',
      });
    }

    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid authentication token.',
    });
  }
}

module.exports = requireAuth;
