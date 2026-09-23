import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  FileSearch, 
  Sliders, 
  RefreshCw, 
  Download, 
  ShieldCheck, 
  Calendar, 
  User, 
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatDate, formatDateTime } from '../utils/formatters';
import Modal from '../components/Modal';
import AuditTrailPanel from '../components/AuditTrailPanel';

export default function ProjectDetailsPage({ project, onNavigate, onNotify }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'source' | 'analysis' | 'config'
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [targetAudience, setTargetAudience] = useState(project?.config?.target_audience || 'General Public');
  const [tone, setTone] = useState(project?.config?.tone || 'Professional');
  const [language, setLanguage] = useState(project?.config?.language || 'English');

  if (!project) {
    return (
      <div className="page-container">
        <div className="card text-center" style={{ padding: '48px' }}>
          <h3>No Project Selected</h3>
          <button className="btn btn-primary mt-4" onClick={() => onNavigate('history')}>
            Back to Project History
          </button>
        </div>
      </div>
    );
  }

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setShowRegenModal(false);
      onNotify?.(`Project outputs regenerated with updated settings: ${tone} tone for ${targetAudience}.`, "success");
    }, 700);
  };

  return (
    <div className="page-container">
      {/* Navigation Breadcrumb */}
      <div style={{ marginBottom: '16px' }}>
        <button 
          className="btn btn-outline btn-sm"
          onClick={() => onNavigate('history')}
        >
          <ArrowLeft size={14} /> Back to History
        </button>
      </div>

      {/* Project Master Header */}
      <div className="card" style={{ marginBottom: '24px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-info">{project.category || "Administrative Brief"}</span>
              <StatusBadge status={project.status || 'Completed'} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                ID: {project.id}
              </span>
            </div>

            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 6px' }}>
              {project.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
              <span>Author: <strong>{project.author || "Authorized Operator"}</strong></span>
              <span>•</span>
              <span>Created: <strong>{formatDateTime(project.created_at)}</strong></span>
              <span>•</span>
              <span>Word Count: <strong>{project.word_count || 450} words</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowRegenModal(true)}
            >
              <RefreshCw size={14} /> Modify & Regenerate
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onNavigate('outputs')}
            >
              Open Outputs ({project.selected_formats?.length || 0})
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-nav" style={{ marginTop: '20px', marginBottom: 0 }}>
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Project Summary
          </button>
          <button 
            className={`tab-btn ${activeTab === 'source' ? 'active' : ''}`}
            onClick={() => setActiveTab('source')}
          >
            Original Source File
          </button>
          <button 
            className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            AI Semantic Analysis
          </button>
          <button 
            className={`tab-btn ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            Configuration & Audit Trail
          </button>
        </div>
      </div>

      {/* Tab 1: Project Summary */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>
              Executive Context
            </h3>
            <p style={{ fontSize: '0.925rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              {project.analysis?.summary || "Project analyzed using S.U.T.R.A. administrative pipeline."}
            </p>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>
              Generated Artifact Channels ({project.selected_formats?.length || 0})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {project.selected_formats?.map((fmt, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '14px 16px',
                    background: 'var(--bg-surface-alt)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', textTransform: 'capitalize' }}>
                      {fmt.replace(/_/g, ' ')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Channel verified • Ready for publish
                    </div>
                  </div>
                  <span className="badge badge-success">Generated</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Original Source */}
      {activeTab === 'source' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem' }}>
              Original Source Document
            </h3>
            <span className="badge badge-neutral">SHA-256 Simulated Hash: 4f8a...9c12</span>
          </div>
          <pre style={{
            background: 'var(--bg-surface-alt)',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: 'var(--text-main)',
            whiteSpace: 'pre-wrap',
            maxHeight: '500px',
            overflowY: 'auto'
          }}>
            {project.source_text}
          </pre>
        </div>
      )}

      {/* Tab 3: AI Analysis */}
      {activeTab === 'analysis' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1rem' }}>
              AI Semantic Graph & Analysis
            </h3>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('analysis')}>
              Open Full Analysis Page <ExternalLink size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <strong>Main Subject:</strong> {project.analysis?.main_topic}
            </div>
            <div>
              <strong>Sensitivity Classification:</strong> {project.analysis?.potential_sensitivity}
            </div>
            <div>
              <strong>Detected Target Audience:</strong> {project.analysis?.detected_audience}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Configuration & Audit Trail */}
      {activeTab === 'config' && (
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '14px' }}>
            <ShieldCheck size={18} color="var(--success-600)" />
            Transformation Configuration & Security Audit Log
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Configured Audience</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px' }}>{project.config?.target_audience || 'General Public'}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target Tone</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px' }}>{project.config?.tone || 'Professional'}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Target Language</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px' }}>{project.config?.language || 'English'}</div>
            </div>
            <div style={{ background: 'var(--bg-surface-alt)', padding: '12px 14px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Detail Level</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '2px' }}>{project.config?.detail_level || 'Standard'}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <AuditTrailPanel trail={project.audit_trail} projectCreatedAt={project.created_at} />
          </div>
        </div>
      )}

      {/* Regeneration Modal */}
      <Modal 
        isOpen={showRegenModal} 
        onClose={() => setShowRegenModal(false)}
        title="Regenerate Outputs with Modified Settings"
        maxWidth="580px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label className="form-label">Target Audience</label>
            <select 
              className="form-select"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
            >
              <option value="General Public">General Public</option>
              <option value="Government Officials">Government Officials</option>
              <option value="Senior Officials">Senior Officials / Approvers</option>
              <option value="Media & Press">Media & Press</option>
              <option value="Technical Teams">Technical Teams</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Communication Tone</label>
            <select 
              className="form-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="Formal">Formal</option>
              <option value="Professional">Professional</option>
              <option value="Neutral">Neutral</option>
              <option value="Informative">Informative</option>
              <option value="Conversational">Conversational</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Language</label>
            <select 
              className="form-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi (हिंदी)</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={() => setShowRegenModal(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              disabled={isRegenerating}
              onClick={handleRegenerate}
            >
              {isRegenerating ? "Regenerating..." : "Apply & Regenerate"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
