import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Layers, 
  RefreshCw, 
  ArrowLeft, 
  Download, 
  Check, 
  Share2,
  FileSearch,
  CheckCircle2
} from 'lucide-react';
import ExecutiveSummaryView from '../components/formats/ExecutiveSummaryView';
import GovernmentAdvisoryView from '../components/formats/GovernmentAdvisoryView';
import LinkedInPostView from '../components/formats/LinkedInPostView';
import TwitterThreadView from '../components/formats/TwitterThreadView';
import PresentationView from '../components/formats/PresentationView';
import InfographicPlanView from '../components/formats/InfographicPlanView';
import VideoPackageView from '../components/formats/VideoPackageView';
import CommentThread from '../components/CommentThread';
import VersionBadge from '../components/VersionBadge';
import Modal from '../components/Modal';
import { downloadAsJSON } from '../utils/exportUtils';

const FORMAT_CONFIG = {
  executive_summary: { label: 'Executive Summary', icon: FileText },
  government_advisory: { label: 'Government Advisory', icon: FileText },
  linkedin_post: { label: 'LinkedIn Post', icon: Share2 },
  x_thread: { label: 'X / Twitter Thread', icon: Share2 },
  presentation: { label: 'Presentation', icon: Layers },
  infographic_plan: { label: 'Infographic', icon: Layers },
  video_package: { label: 'Video Package', icon: Layers }
};

export default function GeneratedOutputsPage({ 
  project, 
  onNavigate, 
  onNotify, 
  onUpdateProject 
}) {
  const [activeTab, setActiveTab] = useState('');
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenScope, setRegenScope] = useState('current'); // 'current' | 'all'
  const [regenTone, setRegenTone] = useState(project?.config?.tone || 'Professional');

  // Filter tabs to only formats selected for this project
  const availableFormats = project?.selected_formats || [
    'executive_summary',
    'government_advisory',
    'linkedin_post',
    'x_thread',
    'presentation',
    'infographic_plan',
    'video_package'
  ];

  useEffect(() => {
    if (availableFormats.length > 0 && (!activeTab || !availableFormats.includes(activeTab))) {
      setActiveTab(availableFormats[0]);
    }
  }, [project, availableFormats, activeTab]);

  if (!project) {
    return (
      <div className="page-container">
        <div className="card text-center" style={{ padding: '48px' }}>
          <Sparkles size={48} color="var(--text-dim)" style={{ margin: '0 auto 16px' }} />
          <h3>No Generated Project Active</h3>
          <p className="text-muted" style={{ margin: '8px 0 20px' }}>
            Select a project from the dashboard or generate communication artifacts from a new source.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('create')}>
            + New Transformation
          </button>
        </div>
      </div>
    );
  }

  const handleExportFullBundle = () => {
    downloadAsJSON(`${project.title.replace(/[^a-zA-Z0-9]/g, '_')}_Full_Transformation_Bundle.json`, {
      metadata: {
        id: project.id,
        title: project.title,
        date: project.created_at,
        config: project.config
      },
      source: project.source_text,
      analysis: project.analysis,
      outputs: project.outputs
    });
    onNotify?.("Full project transformation bundle exported as JSON", "success");
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setShowRegenModal(false);
      onNotify?.(
        regenScope === 'all' 
          ? "All communication artifacts regenerated with updated parameters." 
          : `Regenerated ${FORMAT_CONFIG[activeTab]?.label || 'output'} with ${regenTone} tone.`,
        "success"
      );
    }, 700);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-block" style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-success">Generated Communication</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Source: {project.source_name || "Official Document"}
            </span>
          </div>
          <h1 className="page-title text-truncate" style={{ maxWidth: '100%' }}>{project.title}</h1>
          <p className="page-subtitle">
            Multiple audience-specific artifacts derived consistently from one analyzed source context.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-outline"
            onClick={() => onNavigate('analysis')}
          >
            <FileSearch size={16} /> Source Analysis
          </button>

          <button 
            className="btn btn-outline"
            onClick={() => setShowRegenModal(true)}
          >
            <RefreshCw size={16} /> Regenerate Output
          </button>

          <button 
            className="btn btn-secondary"
            onClick={handleExportFullBundle}
            title="Export all formats in unified bundle"
          >
            <Download size={16} /> Export All ({availableFormats.length})
          </button>
        </div>
      </div>

      {/* Tabs shown ONLY for formats the user selected */}
      <div className="tabs-nav" style={{ marginBottom: '24px' }}>
        {availableFormats.map((fmtKey) => {
          const cfg = FORMAT_CONFIG[fmtKey] || { label: fmtKey };
          const isActive = activeTab === fmtKey;

          return (
            <button
              key={fmtKey}
              className={`tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(fmtKey)}
              aria-selected={isActive}
            >
              <span>{cfg.label}</span>
              <VersionBadge version={1} timestamp={project.created_at} />
              <span 
                className="badge badge-neutral" 
                style={{ fontSize: '0.65rem', padding: '1px 6px' }}
              >
                Ready
              </span>
            </button>
          );
        })}
      </div>

      {/* Format-Specific View Renderers */}
      <div>
        {activeTab === 'executive_summary' && (
          <ExecutiveSummaryView 
            data={project.outputs?.executive_summary} 
            project={project} 
            onNotify={onNotify} 
          />
        )}

        {activeTab === 'government_advisory' && (
          <GovernmentAdvisoryView 
            data={project.outputs?.government_advisory} 
            project={project} 
            onNotify={onNotify} 
          />
        )}

        {activeTab === 'linkedin_post' && (
          <LinkedInPostView 
            data={project.outputs?.linkedin_post} 
            project={project} 
            onNotify={onNotify} 
          />
        )}

        {activeTab === 'x_thread' && (
          <TwitterThreadView 
            data={project.outputs?.x_thread} 
            project={project} 
            onNotify={onNotify} 
          />
        )}

        {activeTab === 'presentation' && (
          <PresentationView 
            data={project.outputs?.presentation} 
            project={project} 
            onNotify={onNotify} 
          />
        )}

        {activeTab === 'infographic_plan' && (
          <InfographicPlanView 
            data={project.outputs?.infographic_plan} 
            project={project} 
            onNotify={onNotify} 
          />
        )}

        {activeTab === 'video_package' && (
          <VideoPackageView 
            data={project.outputs?.video_package} 
            project={project} 
            onNotify={onNotify} 
          />
        )}
      </div>

      {/* Inline Comment Thread for Active Tab */}
      <CommentThread formatId={activeTab} />

      {/* Regeneration Modal */}
      <Modal 
        isOpen={showRegenModal} 
        onClose={() => setShowRegenModal(false)}
        title="Regenerate Communication Artifacts"
        maxWidth="560px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Re-run the synthesis model with updated audience parameters or refine the tone while preserving factual fidelity from the original source.
          </p>

          <div className="form-group">
            <label className="form-label">Regeneration Scope</label>
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="regenScope" 
                  checked={regenScope === 'current'} 
                  onChange={() => setRegenScope('current')} 
                />
                Only Current Format ({FORMAT_CONFIG[activeTab]?.label || activeTab})
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="regenScope" 
                  checked={regenScope === 'all'} 
                  onChange={() => setRegenScope('all')} 
                />
                All Selected Formats ({availableFormats.length})
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Adjust Tone for Regeneration</label>
            <select 
              className="form-select"
              value={regenTone}
              onChange={(e) => setRegenTone(e.target.value)}
            >
              <option value="Formal">Formal</option>
              <option value="Professional">Professional</option>
              <option value="Neutral">Neutral</option>
              <option value="Informative">Informative</option>
              <option value="Conversational">Conversational</option>
              <option value="Urgent">Urgent</option>
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
              {isRegenerating ? "Synthesizing..." : "Execute Regeneration"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
