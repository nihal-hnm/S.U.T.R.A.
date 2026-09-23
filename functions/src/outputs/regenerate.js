/**
 * S.U.T.R.A. Output Regeneration Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/outputs/:id/regenerate
 *   Regenerates a specific output document with updated tone, audience,
 *   language, detail level, or scope constraints. Increments the version
 *   counter and stores the previous content in a history sub-collection.
 */

'use strict';

const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const OUTPUTS_COLLECTION  = 'outputs';
const PROJECTS_COLLECTION = 'projects';
const HISTORY_COLLECTION  = 'generation_history';

// ── Gemini client (lazy init) ─────────────────────────────────────────────────
let _genAI = null;
function getGenAI() {
  if (!_genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY environment variable is not set.');
    _genAI = new GoogleGenerativeAI(apiKey);
  }
  return _genAI;
}

// ── Format-specific regeneration prompt ──────────────────────────────────────
function buildRegeneratePrompt(sourceText, analysis, format, params) {
  const { tone = 'Professional', target_audience = 'General Public', language = 'English', detail_level = 'Standard', scope } = params;

  const formatInstructions = {
    'Press Release':     'formal government press release for media distribution',
    'Social Media Post': 'social media post (max 280 characters) with 2-3 relevant hashtags',
    'FAQ':               '5-8 Frequently Asked Questions with jargon-free answers',
    'Official Circular': 'formal internal government circular with standard GoI formatting',
    'SMS Alert':         'SMS alert (max 160 characters) for mass citizen notification',
    'Speech':            'ministerial speech (3-5 minutes when read aloud)',
    'Infographic Brief': 'infographic brief with headline, 4-6 key statistics, 3-4 visual callouts, and footer',
  };

  const formatDesc = formatInstructions[format] || format;

  return `You are an expert government communications writer for India's S.U.T.R.A. system.

TASK: Regenerate a ${formatDesc} with UPDATED parameters.

UPDATED PARAMETERS:
- Tone: ${tone}
- Target Audience: ${target_audience}
- Language: ${language}
- Detail Level: ${detail_level}
${scope ? `- Scope/Focus: ${scope}` : ''}

DOCUMENT CONTEXT:
${analysis?.summary || ''}

FULL DOCUMENT:
"""
${(sourceText || '').slice(0, 8000)}
"""

REQUIREMENTS:
- Write ONLY the final ${format} content. No preamble, labels, or meta-commentary.
- Apply the updated tone (${tone}) and audience (${target_audience}) parameters strictly.
- Be factually accurate — do not invent statistics not present in the document.
${format === 'SMS Alert' ? '- CRITICAL: The SMS must be 160 characters or fewer.' : ''}
${format === 'Social Media Post' ? '- CRITICAL: The post must be 280 characters or fewer.' : ''}

Write the regenerated ${format} now:`;
}

// ── POST /api/outputs/:id/regenerate ─────────────────────────────────────────
async function regenerateOutput(req, res) {
  const db       = getFirestore();
  const uid      = req.user.uid;
  const outputId = req.params.id;
  const params   = req.body || {};

  try {
    // 1. Fetch the output document
    const outputDoc = await db.collection(OUTPUTS_COLLECTION).doc(outputId).get();
    if (!outputDoc.exists) {
      return res.status(404).json({ error: 'NotFound', message: 'Output not found.' });
    }
    const output = outputDoc.data();

    if (output.ownerId !== uid) {
      return res.status(403).json({ error: 'Forbidden', message: 'Access denied.' });
    }

    // 2. Fetch the parent project to get sourceId
    const projectDoc = await db.collection(PROJECTS_COLLECTION).doc(output.projectId).get();
    if (!projectDoc.exists) {
      return res.status(404).json({ error: 'NotFound', message: 'Parent project not found.' });
    }
    const project = projectDoc.data();

    // 3. Fetch source text and analysis
    const sourceDoc = await db.collection('sources').doc(project.sourceId).get();
    const sourceData = sourceDoc.exists ? sourceDoc.data() : {};

    // 4. Archive current version in history
    const historyRef = db.collection(HISTORY_COLLECTION).doc();
    await historyRef.set({
      id:             historyRef.id,
      outputId,
      projectId:      output.projectId,
      ownerId:        uid,
      format:         output.format,
      content:        output.content,
      version:        output.version || 1,
      config:         output.config || {},
      archivedAt:     FieldValue.serverTimestamp(),
    });

    // 5. Call Gemini for regeneration
    const model = getGenAI().getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { temperature: 0.75 },
    });
    const prompt = buildRegeneratePrompt(
      sourceData.sourceText || '',
      sourceData.analysis   || {},
      output.format,
      params
    );

    let newContent;
    try {
      const result = await model.generateContent(prompt);
      newContent = result.response.text().trim();
    } catch (geminiErr) {
      console.error('[regenerateOutput] Gemini error:', geminiErr.message);
      return res.status(500).json({
        error:   'GeminiError',
        message: 'Content generation failed. Please try again.',
      });
    }

    // 6. Update the output document with new content
    const newVersion = (output.version || 1) + 1;
    await db.collection(OUTPUTS_COLLECTION).doc(outputId).update({
      content:   newContent,
      version:   newVersion,
      config:    { ...(output.config || {}), ...params },
      status:    'complete',
      updatedAt: FieldValue.serverTimestamp(),
    });

    return res.json({
      outputId,
      projectId: output.projectId,
      format:    output.format,
      content:   newContent,
      version:   newVersion,
      status:    'complete',
      params,
    });
  } catch (err) {
    console.error('[regenerateOutput] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

module.exports = { regenerateOutput };
