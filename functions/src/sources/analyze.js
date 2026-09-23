/**
 * S.U.T.R.A. Source Analysis Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/sources
 *   Accepts a raw government document (text or base64 file), stores it in
 *   Firestore, invokes Gemini to extract structured metadata, and returns the
 *   sourceId + analysis object.
 *
 * GET /api/sources
 *   Lists all sources belonging to the authenticated operator, ordered by
 *   creation date descending.
 */

'use strict';

const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const COLLECTION = 'sources';

// ── Gemini client (lazy init so cold-start is fast) ──────────────────────────
let _genAI = null;
function getGenAI() {
  if (!_genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set.');
    _genAI = new GoogleGenerativeAI(apiKey);
  }
  return _genAI;
}

// ── Gemini Analysis Prompt ────────────────────────────────────────────────────
function buildAnalysisPrompt(documentText) {
  return `You are an expert analyst for the Indian Government's S.U.T.R.A. system (Structured Uniform Transformation & Reporting Architecture). Your task is to analyse the following government document and extract structured metadata.

DOCUMENT:
"""
${documentText.slice(0, 12000)}
"""

Respond with a single valid JSON object (no markdown fences, no commentary) with exactly these fields:
{
  "document_title": "<string>",
  "department": "<string>",
  "document_type": "<Press Release | Policy Document | Circular | Report | Notification | Order | Other>",
  "primary_policy_area": "<string>",
  "date_of_document": "<ISO date string or null>",
  "key_beneficiaries": ["<string>", ...],
  "key_statistics": [{ "metric": "<string>", "value": "<string>", "unit": "<string>" }, ...],
  "main_objectives": ["<string>", ...],
  "key_actions": ["<string>", ...],
  "geographical_scope": "<National | State | District | Municipal | Other>",
  "urgency_level": "<Immediate | Standard | Informational>",
  "sentiment": "<Positive | Neutral | Informational | Directive>",
  "word_count": <number>,
  "readability_score": "<Simple | Moderate | Technical>",
  "recommended_formats": ["<Press Release | Social Media Post | FAQ | Official Circular | SMS Alert | Speech | Infographic Brief>", ...],
  "summary": "<2-3 sentence executive summary in plain English>"
}`;
}

// ── POST /api/sources ─────────────────────────────────────────────────────────
async function analyzeSources(req, res) {
  const { sourceText, sourceName, sourceType = 'text' } = req.body;

  if (!sourceText || typeof sourceText !== 'string' || sourceText.trim().length < 20) {
    return res.status(400).json({
      error: 'BadRequest',
      message: 'sourceText is required and must be at least 20 characters.',
    });
  }

  const db = getFirestore();
  const uid = req.user.uid;
  const now = FieldValue.serverTimestamp();

  try {
    // 1. Persist source document
    const sourceRef = db.collection(COLLECTION).doc();
    await sourceRef.set({
      id:          sourceRef.id,
      ownerId:     uid,
      sourceName:  sourceName || 'Untitled Document',
      sourceType,
      sourceText:  sourceText.slice(0, 50000), // cap at 50K chars
      wordCount:   sourceText.split(/\s+/).filter(Boolean).length,
      createdAt:   now,
      updatedAt:   now,
      status:      'analyzing',
    });

    // 2. Call Gemini for analysis
    const model = getGenAI().getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = buildAnalysisPrompt(sourceText);

    let analysis = {};
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      // Strip any accidental markdown fences
      const cleaned = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      analysis = JSON.parse(cleaned);
    } catch (geminiErr) {
      console.error('[analyzeSources] Gemini parsing error:', geminiErr.message);
      // Fallback: return minimal analysis so the workflow can continue
      analysis = {
        document_title: sourceName || 'Unknown Document',
        summary: 'Analysis could not be completed automatically. Please review the document manually.',
        word_count: sourceText.split(/\s+/).filter(Boolean).length,
      };
    }

    // 3. Update Firestore with analysis results
    await sourceRef.update({
      analysis,
      status:    'ready',
      updatedAt: FieldValue.serverTimestamp(),
    });

    return res.status(201).json({
      sourceId: sourceRef.id,
      analysis,
    });
  } catch (err) {
    console.error('[analyzeSources] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

// ── GET /api/sources ──────────────────────────────────────────────────────────
async function listSources(req, res) {
  const db = getFirestore();
  const uid = req.user.uid;

  try {
    const snap = await db
      .collection(COLLECTION)
      .where('ownerId', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const sources = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id:         doc.id,
        sourceName: d.sourceName,
        sourceType: d.sourceType,
        wordCount:  d.wordCount,
        status:     d.status,
        createdAt:  d.createdAt?.toDate?.()?.toISOString() || null,
      };
    });

    return res.json({ sources });
  } catch (err) {
    console.error('[listSources] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

module.exports = { analyzeSources, listSources };
