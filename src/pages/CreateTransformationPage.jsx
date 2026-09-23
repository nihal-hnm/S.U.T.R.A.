import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Link as LinkIcon, 
  Check, 
  X, 
  Sparkles, 
  Sliders, 
  Layers, 
  AlertCircle,
  FileCheck2,
  FolderOpen,
  RotateCcw
} from 'lucide-react';
import PipelineStepper from '../components/PipelineStepper';
import { generateProject } from '../services/api';
import { SAMPLE_PROJECTS } from '../services/sampleData';

const FORMAT_OPTIONS = [
  { id: 'executive_summary', title: 'Executive Summary', desc: 'High-level policy & operational brief with key findings, implications & action matrix.' },
  { id: 'government_advisory', title: 'Government Advisory', desc: 'Official administrative circular layout with ref numbers, directives, affected zones & helpline contacts.' },
  { id: 'linkedin_post', title: 'LinkedIn Post', desc: 'Stakeholder-focused long-form post with verified hook, clear takeaways & sector hashtags.' },
  { id: 'x_thread', title: 'X / Twitter Thread', desc: 'Numbered 280-character post chain designed for emergency notifications & public awareness.' },
  { id: 'presentation', title: 'Presentation Deck', desc: 'Structured 6-card briefing slides with speaker notes & interactive fullscreen viewer.' },
  { id: 'infographic_plan', title: 'Infographic Blueprint', desc: 'Design architecture guide with hero stats, timeline phases, icons & layout hierarchy.' },
  { id: 'video_package', title: 'Video Package & Script', desc: 'Scene-by-scene broadcast breakdown with dual-language narration (EN/HI) & visuals.' }
];

export default function CreateTransformationPage({ onTransformationComplete, onNotify }) {
  // Section 1: Source Input
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'doc' | 'image' | 'video' | 'url'
  const [sourceText, setSourceText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [urlInput, setUrlInput] = useState('');

  // Section 2: Output Format Selection
  const [selectedFormats, setSelectedFormats] = useState([
    'executive_summary',
    'government_advisory',
    'linkedin_post',
    'x_thread',
    'presentation',
    'infographic_plan',
    'video_package'
  ]);

  // Section 3: Generation Configuration
  const [targetAudience, setTargetAudience] = useState('General Public');
  const [tone, setTone] = useState('Professional');
  const [language, setLanguage] = useState('English');
  const [detailLevel, setDetailLevel] = useState('Standard');
  const [objective, setObjective] = useState('Inform');

  // Section 4: Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [stepperState, setStepperState] = useState({ currentStep: 1, isComplete: false });

  // Handle Format Toggle
  const toggleFormat = (formatId) => {
    if (selectedFormats.includes(formatId)) {
      if (selectedFormats.length === 1) {
        onNotify?.("At least one output format must be selected", "warning");
        return;
      }
      setSelectedFormats(selectedFormats.filter(f => f !== formatId));
    } else {
      setSelectedFormats([...selectedFormats, formatId]);
    }
  };

  const handleSelectAllFormats = () => {
    setSelectedFormats(FORMAT_OPTIONS.map(f => f.id));
  };

  const handleClearFormats = () => {
    setSelectedFormats(['executive_summary']); // keep at least 1
  };

  // Pre-load sample source template
  const handleLoadSample = (sampleIndex = 0) => {
    const sample = SAMPLE_PROJECTS[sampleIndex] || SAMPLE_PROJECTS[0];
    setSourceText(sample.source_text);
    setActiveTab('text');
    setTargetAudience(sample.config?.target_audience || 'General Public');
    setTone(sample.config?.tone || 'Professional');
    setLanguage(sample.config?.language || 'English');
    onNotify?.(`Loaded sample source: ${sample.title}`, "info");
  };

  // Mock File Upload Handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newFileList = files.map(f => ({
        name: f.name,
        size: `${Math.round(f.size / 1024)} KB`,
        type: f.type || 'Document'
      }));
      setUploadedFiles([...uploadedFiles, ...newFileList]);
      if (!sourceText) {
        setSourceText(`[Ingested content from file: ${files[0].name}]\n\nOfficial administrative circular submitted for transformation. Details include organizational directives, affected jurisdictions, operational deadlines, and resource deployment protocols.`);
      }
      onNotify?.(`${files.length} file(s) attached successfully`, "success");
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  // Primary Generate Handler
  const handleGenerate = async () => {
    const contentToProcess = sourceText.trim() || 
      (urlInput.trim() ? `[Source URL: ${urlInput.trim()}]\nOfficial web resource submitted for transformation and analysis.` : '') ||
      (uploadedFiles.length ? `[Uploaded file: ${uploadedFiles[0].name}]\nOfficial administrative document undergoing S.U.T.R.A. transformation.` : '');

    if (!contentToProcess) {
      onNotify?.("Please enter text, upload a document, or load a sample scenario.", "error");
      return;
    }

    if (selectedFormats.length === 0) {
      onNotify?.("Please select at least one output format.", "error");
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);
    setStepperState({ currentStep: 1, isComplete: false });

    try {
      // generateProject handles both the real API path and demo fallback internally.
      // In demo mode it calls runMockTransformation and drives the stepper via onProgress.
      // In configured mode it advances the stepper through defined phases while waiting.
      const generatedProject = await generateProject({
        sourceText: contentToProcess,
        sourceName: uploadedFiles[0]?.name || (urlInput ? 'Web_Resource.html' : 'Official_Source_Circular.txt'),
        sourceType: activeTab,
        selectedFormats,
        config: {
          target_audience: targetAudience,
          tone,
          language,
          detail_level: detailLevel,
          objective
        },
        // onProgress drives the stepper; used by demo mode and partially by real mode
        onProgress: (progress) => {
          setStepperState(progress);
        }
      });

      onNotify?.(`${selectedFormats.length} communication artifacts generated successfully.`, "success");
      setTimeout(() => {
        setIsGenerating(false);
        onTransformationComplete(generatedProject);
      }, 400);

    } catch (err) {
      console.error('[Generate]', err);
      setIsGenerating(false);
      // Surface specific backend errors through the existing error card
      const msg = err.message || "Unable to process this source. Please check the format and try again.";
      setGenerationError(msg);
      onNotify?.(msg, "error");
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '1100px' }}>
      <div className="page-header">
        <div className="page-title-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-accent">Core Workflow</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Step 1 of 3: Input & Configuration</span>
          </div>
          <h1 className="page-title">Create New Transformation</h1>
          <p className="page-subtitle">
            Ingest a single administrative source document to generate audience-calibrated official artifacts across selected channels.
          </p>
        </div>

        {/* Quick Preload Sample Scenario Dropdown */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>Sample Sources:</span>
          <button 
            type="button" 
            className="btn btn-outline btn-sm" 
            onClick={() => handleLoadSample(0)}
            title="Load District Flood Advisory scenario"
          >
            Flood Alert
          </button>
          <button 
            type="button" 
            className="btn btn-outline btn-sm" 
            onClick={() => handleLoadSample(1)}
            title="Load ABDM Policy Circular scenario"
          >
            Health Policy
          </button>
          <button 
            type="button" 
            className="btn btn-outline btn-sm" 
            onClick={() => handleLoadSample(2)}
            title="Load CERT-In SCADA brief scenario"
          >
            Cyber Advisory
          </button>
        </div>
      </div>

      {/* When Generation is Running: Display Restrained Stepper */}
      {isGenerating ? (
        <div style={{ margin: '32px 0' }}>
          <PipelineStepper 
            currentStep={stepperState.currentStep} 
            isComplete={stepperState.isComplete}
            onSkip={() => {
              // Allows reviewer to bypass animation if desired
              setStepperState({ currentStep: 7, isComplete: true });
            }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Error State Card */}
          {generationError && (
            <div className="error-state-card">
              <div className="error-icon">
                <AlertCircle size={24} />
              </div>
              <h3>Transformation Failed</h3>
              <p>{generationError}</p>
              <button 
                className="btn btn-outline btn-sm" 
                onClick={() => setGenerationError(null)}
              >
                <RotateCcw size={14} /> Dismiss & Retry
              </button>
            </div>
          )}
          
          {/* ========================================================================= */}
          {/* SECTION 1: SOURCE INPUT                                                   */}
          {/* ========================================================================= */}
          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <FileText size={18} color="var(--accent-500)" />
                  Section 1 — Source Input
                </h2>
                <p className="card-desc">
                  Select input modality. Supports text paste, reports, PDF, circulars, or URLs.
                </p>
              </div>
              <span className="badge badge-neutral">Max file size: 25MB</span>
            </div>

            {/* Input Modality Tabs */}
            <div className="tabs-nav">
              <button 
                className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                onClick={() => setActiveTab('text')}
              >
                <FileText size={16} /> Paste Text
              </button>
              <button 
                className={`tab-btn ${activeTab === 'doc' ? 'active' : ''}`}
                onClick={() => setActiveTab('doc')}
              >
                <Upload size={16} /> Upload Document (PDF/DOCX/TXT)
              </button>
              <button 
                className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
                onClick={() => setActiveTab('image')}
              >
                <ImageIcon size={16} /> Upload Image (PNG/JPG)
              </button>
              <button 
                className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => setActiveTab('video')}
              >
                <VideoIcon size={16} /> Upload Video (MP4)
              </button>
              <button 
                className={`tab-btn ${activeTab === 'url' ? 'active' : ''}`}
                onClick={() => setActiveTab('url')}
              >
                <LinkIcon size={16} /> Web / Circular URL
              </button>
            </div>

            {/* Tab 1: Paste Text */}
            {activeTab === 'text' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Official Document or Advisory Text
                  </label>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {sourceText.trim() ? `${sourceText.trim().split(/\s+/).length} words` : '0 words'}
                  </span>
                </div>
                <textarea
                  className="form-textarea"
                  rows={8}
                  placeholder="Paste the raw text of the government circular, incident report, press brief, or ministry guidelines here... e.g. District Disaster Management Authority advisory on river level surges..."
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  style={{ minHeight: '180px', fontSize: '0.9rem' }}
                />
              </div>
            )}

            {/* Tab 2, 3, 4: File Upload Drag-and-Drop */}
            {(activeTab === 'doc' || activeTab === 'image' || activeTab === 'video') && (
              <div>
                <div 
                  style={{
                    border: '2px dashed var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px 20px',
                    textAlign: 'center',
                    background: 'var(--bg-surface-alt)',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('file-upload-input').click()}
                >
                  <input 
                    id="file-upload-input" 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={handleFileUpload}
                    multiple
                  />
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-surface)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <Upload size={22} color="var(--accent-500)" />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Drag & Drop or Click to Select File
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                    {activeTab === 'doc' && "Supports PDF, DOCX, TXT (Official reports, circulars)"}
                    {activeTab === 'image' && "Supports PNG, JPG, JPEG (Infographics, scanned notices)"}
                    {activeTab === 'video' && "Supports MP4, MOV (Press conference recordings)"}
                  </div>
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dim)' }}>
                      Attached Files ({uploadedFiles.length}):
                    </span>
                    {uploadedFiles.map((file, idx) => (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-md)'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileCheck2 size={18} color="var(--success-600)" />
                          <div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{file.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{file.size} • Verified Format</div>
                          </div>
                        </div>
                        <button 
                          className="btn btn-outline btn-sm" 
                          onClick={() => removeFile(idx)}
                          style={{ padding: '4px', border: 'none', color: 'var(--danger-600)' }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 5: URL Input */}
            {activeTab === 'url' && (
              <div>
                <label className="form-label">
                  Public Advisory or Gazette Notification URL
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://state.gov.in/advisories/monsoon-flood-directive-2026.html"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      if (urlInput) onNotify?.("URL validated. S.U.T.R.A. parser ready.", "success");
                    }}
                  >
                    Validate
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* SECTION 2: OUTPUT FORMAT SELECTION (Multi-Select Cards)                  */}
          {/* ========================================================================= */}
          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <Layers size={18} color="var(--green-500)" />
                  Section 2 — Output Format Selection
                </h2>
                <p className="card-desc">
                  Select which audience-specific communication channels to generate from the analyzed source context.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-accent">
                  {selectedFormats.length} of {FORMAT_OPTIONS.length} Selected
                </span>
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm" 
                  onClick={handleSelectAllFormats}
                >
                  Select All
                </button>
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm" 
                  onClick={handleClearFormats}
                >
                  Reset
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px'
            }}>
              {FORMAT_OPTIONS.map((fmt) => {
                const isSelected = selectedFormats.includes(fmt.id);

                return (
                  <div
                    key={fmt.id}
                    onClick={() => toggleFormat(fmt.id)}
                    style={{
                      border: isSelected ? '2px solid var(--accent-500)' : '1px solid var(--border-light)',
                      background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-surface-alt)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '16px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 10px var(--accent-50)' : 'none'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? 'none' : '2px solid var(--border-default)',
                      background: isSelected ? 'var(--accent-600)' : 'transparent',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '3px' }}>
                        {fmt.title}
                      </div>
                      <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        {fmt.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 3: GENERATION CONFIGURATION                                       */}
          {/* ========================================================================= */}
          <section className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">
                  <Sliders size={18} color="var(--accent-500)" />
                  Section 3 — Generation Configuration
                </h2>
                <p className="card-desc">
                  Tune audience calibration, tone constraints, language, and communication objectives.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px'
            }}>
              {/* Target Audience Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="target-audience">Target Audience</label>
                <select 
                  id="target-audience"
                  className="form-select"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                >
                  <option value="General Public">General Public</option>
                  <option value="Government Officials">Government Officials</option>
                  <option value="Senior Officials">Senior Officials / Approvers</option>
                  <option value="Media & Press">Media & Press</option>
                  <option value="Technical Teams">Technical Teams</option>
                  <option value="Students & Youth">Students & Youth</option>
                  <option value="Businesses & Enterprises">Businesses & Enterprises</option>
                </select>
                <span className="form-hint">Calibrates register and jargon level</span>
              </div>

              {/* Tone Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="comm-tone">Communication Tone</label>
                <select 
                  id="comm-tone"
                  className="form-select"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value="Formal">Formal (Standard Administrative)</option>
                  <option value="Professional">Professional (Clear & Direct)</option>
                  <option value="Neutral">Neutral (Objective Assessment)</option>
                  <option value="Informative">Informative (Educational & Public)</option>
                  <option value="Conversational">Conversational (Accessible Citizen-first)</option>
                  <option value="Urgent">Urgent (Life Safety / Emergency Alert)</option>
                </select>
                <span className="form-hint">Governs urgency and authoritative styling</span>
              </div>

              {/* Language Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="output-language">Language</label>
                <select 
                  id="output-language"
                  className="form-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Hinglish">Hinglish (Colloquial Urban)</option>
                </select>
                <span className="form-hint">Architected for multi-lingual Indian regional support</span>
              </div>

              {/* Objective Dropdown */}
              <div className="form-group">
                <label className="form-label" htmlFor="comm-objective">Communication Objective</label>
                <select 
                  id="comm-objective"
                  className="form-select"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                >
                  <option value="Inform">Inform</option>
                  <option value="Educate">Educate</option>
                  <option value="Alert">Alert & Direct Action</option>
                  <option value="Summarize">Summarize</option>
                  <option value="Explain">Explain Regulatory Context</option>
                  <option value="Public Awareness">Public Awareness Campaign</option>
                </select>
                <span className="form-hint">Determines call to action weighting</span>
              </div>
            </div>

            {/* Level of Detail Segmented Control */}
            <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-main)', display: 'block' }}>
                  Level of Detail
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Controls output depth, evidence citation, and clause breakdown
                </span>
              </div>

              <div className="segmented-control">
                {['Brief', 'Standard', 'Detailed'].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    className={`segment-btn ${detailLevel === lvl ? 'active' : ''}`}
                    onClick={() => setDetailLevel(lvl)}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION 4: GENERATE PRIMARY CTA                                           */}
          {/* ========================================================================= */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                Ready to execute S.U.T.R.A. transformation pipeline
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Will synthesize {selectedFormats.length} verified artifacts for {targetAudience} ({tone} tone, {language}).
              </div>
            </div>

            <button
              type="button"
              className="btn btn-accent btn-lg"
              onClick={handleGenerate}
              style={{ fontWeight: 700 }}
            >
              <Sparkles size={18} />
              Generate Communication ({selectedFormats.length} Formats)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
