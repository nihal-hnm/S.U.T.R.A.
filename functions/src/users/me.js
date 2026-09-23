/**
 * S.U.T.R.A. User Profile Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * GET  /api/me  — Fetch authenticated operator's profile.
 *                 Creates a default profile document on first access.
 *
 * PATCH /api/me — Update mutable fields of the operator's profile.
 *                 Sensitive fields (uid, email, role, clearance_level) are
 *                 read-only and cannot be changed via this endpoint.
 */

'use strict';

const { getFirestore, FieldValue } = require('firebase-admin/firestore');

const USERS_COLLECTION = 'users';

// Fields that operators are NOT allowed to self-update
const IMMUTABLE_FIELDS = new Set([
  'uid', 'email', 'ownerId', 'role', 'clearance_level', 'employee_id',
  'createdAt', 'status',
]);

// ── Default profile template ──────────────────────────────────────────────────
function buildDefaultProfile(uid, email, name) {
  return {
    uid,
    ownerId:          uid,
    email:            email || '',
    name:             name  || email?.split('@')[0] || 'Operator',
    role:             'Communications Specialist',
    department:       'Department of Administrative Coordination & Public Information',
    designation:      'Public Information Officer',
    employee_id:      `GOV-IN-${Math.floor(1000 + Math.random() * 9000)}`,
    clearance_level:  'Level 2 (Public Information)',
    status:           'Active - Authorized',
    preferences: {
      default_language:   'English',
      default_tone:       'Professional',
      default_audience:   'General Public',
      default_detail:     'Standard',
      theme:              'dark',
      auto_save_drafts:   true,
      two_factor_auth:    false,
      audit_logging:      true,
    },
    createdAt:  FieldValue.serverTimestamp(),
    updatedAt:  FieldValue.serverTimestamp(),
    last_login: FieldValue.serverTimestamp(),
  };
}

// ── GET /api/me ───────────────────────────────────────────────────────────────
async function getMe(req, res) {
  const db  = getFirestore();
  const uid = req.user.uid;

  try {
    const userRef = db.collection(USERS_COLLECTION).doc(uid);
    let userDoc   = await userRef.get();

    if (!userDoc.exists) {
      // First-time login: create default profile
      const defaultProfile = buildDefaultProfile(uid, req.user.email, req.user.name);
      await userRef.set(defaultProfile);
      userDoc = await userRef.get();
    } else {
      // Update last_login timestamp
      await userRef.update({ last_login: FieldValue.serverTimestamp() });
    }

    const data = userDoc.data();
    return res.json({
      ...data,
      createdAt:  data.createdAt?.toDate?.()?.toISOString()  || null,
      updatedAt:  data.updatedAt?.toDate?.()?.toISOString()  || null,
      last_login: data.last_login?.toDate?.()?.toISOString() || null,
    });
  } catch (err) {
    console.error('[getMe] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

// ── PATCH /api/me ─────────────────────────────────────────────────────────────
async function updateMe(req, res) {
  const db      = getFirestore();
  const uid     = req.user.uid;
  const updates = req.body || {};

  // Strip immutable fields from the update payload
  const sanitised = Object.fromEntries(
    Object.entries(updates).filter(([k]) => !IMMUTABLE_FIELDS.has(k))
  );

  if (Object.keys(sanitised).length === 0) {
    return res.status(400).json({
      error:   'BadRequest',
      message: 'No updatable fields provided.',
    });
  }

  sanitised.updatedAt = FieldValue.serverTimestamp();

  try {
    const userRef = db.collection(USERS_COLLECTION).doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'NotFound', message: 'User profile not found.' });
    }

    await userRef.update(sanitised);

    const updated = (await userRef.get()).data();
    return res.json({
      ...updated,
      createdAt:  updated.createdAt?.toDate?.()?.toISOString()  || null,
      updatedAt:  updated.updatedAt?.toDate?.()?.toISOString()  || null,
      last_login: updated.last_login?.toDate?.()?.toISOString() || null,
    });
  } catch (err) {
    console.error('[updateMe] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

module.exports = { getMe, updateMe };
