import React from 'react';
import { 
  Sparkles, 
  Plus, 
  FileText, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  FileCheck, 
  Shield, 
  Activity,
  FileQuestion,
  ExternalLink,
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/formatters';

export default function DashboardPage({ 
  projects = [], 
  onNavigate, 
  onSelectProject, 
  currentUser 
}) {
  // Compute realistic statistics from current state
  const totalProjects = projects.length;
  const totalSources = projects.length; // Active source documents
  const totalOutputs = projects.reduce((acc, p) => acc + (p.selected_formats?.length || 0), 0);
  const recentCount = projects.filter(p => new Date(p.created_at) > new Date(Date.now() - 86400000 * 7)).length;

  return (
    <div className="page-container">
      {/* Hero Announcement Box */}
      <div className="hero-banner">
        <div className="hero-radial-glow" aria-hidden="true" />

        <div style={{ maxWidth: '760px', position: 'relative', zIndex: 1 }}>
          <div className="meta-tag meta-tag-spruce" style={{ marginBottom: '16px' }}>
            <span className="status-dot-emerald" />
            <span>Institutional Transformation Core · Active Engine</span>
          </div>

          <h1 className="hero-headline">
            Transform information into <span className="hero-headline-italic">communication.</span>
          </h1>

          <p className="hero-desc">
            Submit an official source once. S.U.T.R.A. analyzes the context and derives audience-calibrated executive summaries, government advisories, social briefs, slide decks, and broadcast packages with zero informational drift.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('create')}
            >
              <Plus size={16} /> New Transformation
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onNavigate('history')}
            >
              Browse All Projects ({totalProjects})
            </button>
          </div>
        </div>
      </div>

      {/* Conceptual Pipeline Visualization Card: Interconnected Pipeline Flow */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div className="card-header" style={{ marginBottom: '8px' }}>
          <div>
            <h2 className="card-title">
              <Layers size={18} color="var(--accent-500)" />
              S.U.T.R.A. Transformation Architecture
            </h2>
            <p className="card-desc">
              Deterministic 5-phase conversion lifecycle from single input to multi-channel artifacts
            </p>
          </div>
          <div className="meta-tag">
            <Shield size={12} color="var(--text-dim)" />
            <span>Audited Deterministic Pipeline</span>
          </div>
        </div>

        <div className="pipeline-flow-wrapper">
          {[
            { idx: "01", tag: "Ingest", step: "Source Input", desc: "Report, circular, gazette or multimodal intake" },
            { idx: "02", tag: "Analysis", step: "Understanding", desc: "Entity graph, directive & sensitivity analysis" },
            { idx: "03", tag: "Synthesis", step: "Transformation", desc: "Audience calibration & tone adjustment" },
            { idx: "04", tag: "Channels", step: "Response Format", desc: "Multi-format generation across 7 channels" },
            { idx: "05", tag: "Output", step: "Artifact Delivery", desc: "Audited, exportable & verifiable packages" }
          ].map((item, idx, arr) => (
            <React.Fragment key={idx}>
              <div className="pipeline-flow-stage">
                <div className="pipeline-stage-top">
                  <span className="pipeline-step-pill">{item.idx}</span>
                  <span className="pipeline-stage-tag">
                    {item.tag}
                  </span>
                </div>
                <div className="pipeline-stage-title">
                  {item.step}
                </div>
                <div className="pipeline-stage-desc">
                  {item.desc}
                </div>
              </div>
              {idx < arr.length - 1 && (
                <div className="pipeline-connector-line" aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
      <div className="card animate-fade-in-up animate-fade-in-up-1" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="metric-label">
              Total Projects
            </span>
            <FileText size={17} color="var(--text-dim)" />
          </div>
          <div className="metric-value">
            {totalProjects}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Active transformation workspaces
          </div>
        </div>

        <div className="card animate-fade-in-up animate-fade-in-up-2" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="metric-label">
              Sources Processed
            </span>
            <FileCheck size={17} color="var(--text-dim)" />
          </div>
          <div className="metric-value">
            {totalSources}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            PDFs, Circulars, Logs & Direct Input
          </div>
        </div>

        <div className="card animate-fade-in-up animate-fade-in-up-3" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="metric-label">
              Outputs Generated
            </span>
            <Sparkles size={17} color="var(--text-dim)" />
          </div>
          <div className="metric-value">
            {totalOutputs}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Multi-channel verified artifacts
          </div>
        </div>

        <div className="card animate-fade-in-up animate-fade-in-up-4" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="metric-label">
              Recent Activity
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="status-dot-emerald" />
              <Activity size={17} color="var(--accent-500)" />
            </div>
          </div>
          <div className="metric-value">
            {recentCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Transformations in past 7 days
          </div>
        </div>
      </div>

      {/* Recent Projects List Section */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              Recent Transformation Projects
            </h2>
            <p className="card-desc">
              Administrative communication scenarios available for operational review.
            </p>
          </div>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => onNavigate('history')}
          >
            View Full History
          </button>
        </div>

        {/* Empty State when no projects */}
        {projects.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FolderOpen size={32} />
            </div>
            <h3>No Transformation Projects Yet</h3>
            <p>
              Submit your first official source document to generate multi-format communication artifacts using the S.U.T.R.A. pipeline.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('create')}
              style={{ marginTop: '8px' }}
            >
              <Plus size={16} /> Create First Transformation
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map((proj) => (
              <div 
                key={proj.id}
                style={{
                  backgroundColor: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  e.currentTarget.style.borderColor = 'var(--border-strong)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-alt)';
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                }}
              >
                <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span className="sample-data-badge">Sample Data</span>
                    <span className="meta-tag" style={{ fontSize: '10px' }}>
                      {proj.category || "Administration"}
                    </span>
                    <StatusBadge status={proj.status} size="sm" />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums' }}>
                      {formatDate(proj.created_at)}
                    </span>
                  </div>

                  <div className="text-truncate" style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px', letterSpacing: '-0.01em', maxWidth: '100%' }}>
                    {proj.title}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Formats:
                    </span>
                    {proj.selected_formats?.map((fmt, i) => (
                      <span key={i} className="meta-tag" style={{ fontSize: '10px', textTransform: 'capitalize' }}>
                        {fmt.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      onSelectProject(proj);
                      onNavigate('project-details', { projectId: proj.id });
                    }}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      onSelectProject(proj);
                      onNavigate('outputs');
                    }}
                  >
                    Open Outputs <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
