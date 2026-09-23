/**
 * S.U.T.R.A. Project Generation Handler
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/projects
 *   Triggers Gemini generation for all requested output formats.
 *   Saves the project + individual output documents to Firestore.
 *   Returns the complete project object with all generated outputs.
 *
 * GET /api/projects/:id
 *   Returns a project and its outputs. Only accessible by the owning operator.
 *
 * DELETE /api/projects/:id
 *   Soft-deletes a project (marks as archived). Hard-delete on Firestore can
 *   be scheduled via a Cloud Function triggered cron job.
 */

'use strict';

const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const PROJECTS_COLLECTION = 'projects';
const OUTPUTS_COLLECTION  = 'outputs';

// ── Output format definitions ─────────────────────────────────────────────────
const FORMAT_META = {
  'Press Release': {
    key:         'press_release',
    label:       'Press Release',
    maxTokens:   1024,
    description: 'formal government press release for media distribution',
  },
  'Social Media Post': {
    key:         'social_media',
    label:       'Social Media Post',
    maxTokens:   512,
    description: 'concise, engaging social media post (max 280 chars) suitable for Twitter/X and Facebook',
  },
  'FAQ': {
    key:         'faq',
    label:       'FAQ',
    maxTokens:   1024,
    description: 'list of 5-8 Frequently Asked Questions with clear, jargon-free answers',
  },
  'Official Circular': {
    key:         'circular',
    label:       'Official Circular',
    maxTokens:   1024,
    description: 'formal internal government circular for departmental distribution, with standard GoI formatting',
  },
  'SMS Alert': {
    key:         'sms',
    label:       'SMS Alert',
    maxTokens:   256,
    description: 'brief SMS alert (max 160 characters) for mass citizen notification',
  },
  'Speech': {
    key:         'speech',
    label:       'Speech',
    maxTokens:   1500,
    description: 'ministerial or official speech (3-5 minutes when read aloud) with rhetorical structure',
  },
  'Infographic Brief': {
    key:         'infographic',
    label:       'Infographic Brief',
    maxTokens:   768,
    description: 'structured content brief for an infographic: headline, 4-6 key statistics, 3-4 visual callouts, footer note',
  },
};

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

// ── Single-format generation prompt ──────────────────────────────────────────
function buildFormatPrompt(sourceText, analysis, formatName, config = {}) {
  const meta = FORMAT_META[formatName];
  const tone      = config.tone           || 'Professional';
  const audience  = config.target_audience|| 'General Public';
  const language  = config.language       || 'English';
  const detail    = config.detail_level   || 'Standard';

  return `You are an expert government communications writer for India's S.U.T.R.A. system.

TASK: Write a ${meta.description} based on the source document below.

PARAMETERS:
- Tone: ${tone}
- Target Audience: ${audience}
- Language: ${language}
- Detail Level: ${detail}
- Format: ${meta.label}

DOCUMENT SUMMARY:
${analysis?.summary || ''}

FULL DOCUMENT:
"""
${sourceText.slice(0, 8000)}
"""

REQUIREMENTS:
- Write ONLY the final ${meta.label} content. No preamble, no meta-commentary.
- Strictly follow Indian Government communication guidelines.
- Use ${language} language throughout.
- Apply a ${tone.toLowerCase()} tone appropriate for ${audience}.
- Be factually accurate — do not invent statistics or facts not present in the document.
${formatName === 'SMS Alert' ? '- CRITICAL: The SMS must be 160 characters or fewer.' : ''}
${formatName === 'Social Media Post' ? '- CRITICAL: The post must be 280 characters or fewer. Include 2-3 relevant hashtags.' : ''}

Write the ${meta.label} now:`;
}

// ── Generate all formats concurrently ────────────────────────────────────────
async function generateAllFormats(sourceText, analysis, selectedFormats, config) {
  const model = getGenAI().getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { temperature: 0.7 },
  });

  const tasks = selectedFormats
    .filter((f) => FORMAT_META[f])
    .map(async (formatName) => {
      const prompt = buildFormatPrompt(sourceText, analysis, formatName, config);
      try {
        const result = await model.generateContent(prompt);
        return {
          format:    formatName,
          key:       FORMAT_META[formatName].key,
          content:   result.response.text().trim(),
          status:    'complete',
          createdAt: new Date().toISOString(),
        };
      } catch (err) {
        console.error(`[generate] Error generating ${formatName}:`, err.message);
        return {
          format:    formatName,
          key:       FORMAT_META[formatName].key,
          content:   `Generation failed: ${err.message}`,
          status:    'error',
          createdAt: new Date().toISOString(),
        };
      }
    });

  return Promise.all(tasks);
}

// ── POST /api/projects ────────────────────────────────────────────────────────
async function generateProject(req, res) {
  const {
    sourceId,
    title,
    selected_formats: selectedFormats,
    config = {},
  } = req.body;

  if (!sourceId || !Array.isArray(selectedFormats) || selectedFormats.length === 0) {
    return res.status(400).json({
      error: 'BadRequest',
      message: 'sourceId and selected_formats (non-empty array) are required.',
    });
  }

  const db  = getFirestore();
  const uid = req.user.uid;
  const now = FieldValue.serverTimestamp();

  try {
    // 1. Fetch the source document
    const sourceDoc = await db.collection('sources').doc(sourceId).get();
    if (!sourceDoc.exists) {
      return res.status(404).json({ error: 'NotFound', message: 'Source document not found.' });
    }
    const sourceData = sourceDoc.data();

    // Verify ownership
    if (sourceData.ownerId !== uid) {
      return res.status(403).json({ error: 'Forbidden', message: 'You do not own this source.' });
    }

    // 2. Create project record (status: generating)
    const projectRef = db.collection(PROJECTS_COLLECTION).doc();
    await projectRef.set({
      id:              projectRef.id,
      ownerId:         uid,
      title:           title || sourceData.sourceName || 'Untitled Project',
      sourceId,
      sourceName:      sourceData.sourceName,
      sourceFormat:    sourceData.sourceType,
      wordCount:       sourceData.wordCount,
      selectedFormats,
      config,
      status:          'generating',
      outputCount:     0,
      createdAt:       now,
      updatedAt:       now,
    });

    // 3. Generate all formats via Gemini
    const outputs = await generateAllFormats(
      sourceData.sourceText || '',
      sourceData.analysis   || {},
      selectedFormats,
      config
    );

    // 4. Write each output as a sub-document
    const batch = db.batch();
    for (const output of outputs) {
      const outRef = db.collection(OUTPUTS_COLLECTION).doc();
      batch.set(outRef, {
        id:        outRef.id,
        projectId: projectRef.id,
        ownerId:   uid,
        format:    output.format,
        formatKey: output.key,
        content:   output.content,
        status:    output.status,
        config,
        version:   1,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }
    await batch.commit();

    // 5. Update project to complete
    await projectRef.update({
      status:      'complete',
      outputCount: outputs.length,
      updatedAt:   FieldValue.serverTimestamp(),
    });

    // 6. Respond with the full project object
    return res.status(201).json({
      id:              projectRef.id,
      ownerId:         uid,
      title:           title || sourceData.sourceName,
      sourceId,
      sourceName:      sourceData.sourceName,
      selectedFormats,
      config,
      status:          'complete',
      outputs,
      analysis:        sourceData.analysis || {},
      createdAt:       new Date().toISOString(),
    });
  } catch (err) {
    console.error('[generateProject] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

// ── GET /api/projects/:id ─────────────────────────────────────────────────────
async function getProject(req, res) {
  const db        = getFirestore();
  const uid       = req.user.uid;
  const projectId = req.params.id;

  try {
    const projectDoc = await db.collection(PROJECTS_COLLECTION).doc(projectId).get();
    if (!projectDoc.exists) {
      return res.status(404).json({ error: 'NotFound', message: 'Project not found.' });
    }
    const project = projectDoc.data();

    if (project.ownerId !== uid) {
      return res.status(403).json({ error: 'Forbidden', message: 'Access denied.' });
    }

    // Fetch associated outputs
    const outputsSnap = await db
      .collection(OUTPUTS_COLLECTION)
      .where('projectId', '==', projectId)
      .get();

    const outputs = outputsSnap.docs.map((d) => {
      const o = d.data();
      return {
        id:        d.id,
        format:    o.format,
        formatKey: o.formatKey,
        content:   o.content,
        status:    o.status,
        version:   o.version,
        createdAt: o.createdAt?.toDate?.()?.toISOString() || null,
      };
    });

    return res.json({
      ...project,
      createdAt: project.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: project.updatedAt?.toDate?.()?.toISOString() || null,
      outputs,
    });
  } catch (err) {
    console.error('[getProject] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

// ── DELETE /api/projects/:id ──────────────────────────────────────────────────
async function deleteProject(req, res) {
  const db        = getFirestore();
  const uid       = req.user.uid;
  const projectId = req.params.id;

  try {
    const projectDoc = await db.collection(PROJECTS_COLLECTION).doc(projectId).get();
    if (!projectDoc.exists) {
      return res.status(404).json({ error: 'NotFound', message: 'Project not found.' });
    }
    if (projectDoc.data().ownerId !== uid) {
      return res.status(403).json({ error: 'Forbidden', message: 'Access denied.' });
    }

    // Soft-delete: mark as archived
    await db.collection(PROJECTS_COLLECTION).doc(projectId).update({
      status:    'archived',
      archivedAt: FieldValue.serverTimestamp(),
      updatedAt:  FieldValue.serverTimestamp(),
    });

    return res.json({ success: true, deletedId: projectId });
  } catch (err) {
    console.error('[deleteProject] Error:', err);
    return res.status(500).json({ error: 'ServerError', message: err.message });
  }
}

module.exports = { generateProject, getProject, deleteProject };
