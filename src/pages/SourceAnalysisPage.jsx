import React, { useState } from 'react';
import { 
  FileSearch, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  Layers, 
  Eye, 
  ShieldAlert, 
  ArrowRight,
  BookOpen,
  Calendar,
  Building2,
  MapPin,
  Tag
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { estimateReadTime } from '../utils/formatters';

export default function SourceAnalysisPage({ project, onNavigate }) {
  const [showSourceModal, setShowSourceModal] = useState(false);

  if (!project) {
    return (
      <div className="page-container">
        <div className="card text-center" style={{ padding: '48px' }}>
          <FileSearch size={48} color="var(--text-dim)" style={{ margin: '0 auto 16px' }} />
          <h3>No Source Selected for Analysis</h3>
          <p className="text-muted" style={{ margin: '8px 0 20px' }}>
            Please select an existing project from the Dashboard or create a new transformation.
          </p>
          <button className="btn btn-primary" onClick={() => onNavigate('create')}>
            + New Transformation
          </button>
        </div>
      </div>
    );
  }

  const analysis = project.analysis || {};
  const entities = analysis.entities || {};

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-title-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-info">Semantic Understanding</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Phase 2: Source Knowledge Extraction</span>
          </div>
          <h1 className="page-title">Source Document Analysis</h1>
          <p className="page-subtitle">
            Comprehensive knowledge graph representation and factual analysis extracted from the input source.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-outline"
            onClick={() => setShowSourceModal(true)}
            title="Inspect original raw document text"
          >
            <Eye size={16} /> View Original Source
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('outputs')}
          >
            View Generated Outputs ({project.selected_formats?.length || 0}) <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Source Overview Metrics Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <span className="badge badge-neutral" style={{ marginBottom: '6px' }}>{project.source_format || "Administrative Text"}</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
              {project.title}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Source File: <strong>{project.source_name || "Direct Input"}</strong> • Size: {project.source_size || "18 KB"}
            </div>
          </div>
          <StatusBadge status={project.status || 'Verified'} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Word Count</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
              {project.word_count || 450} words
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Reading Time</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {estimateReadTime(project.word_count || 450)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Source Language</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {project.config?.language || 'English'}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Processing State</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--success-700)' }}>
              Analyzed & Verified
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Card 1: Main Topic & Executive Summary */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
              <BookOpen size={18} color="var(--accent-500)" />
              Main Topic & Executive Synthesis
            </h3>
            <span className="badge badge-info">Core Semantic Context</span>
          </div>

          <div style={{ background: 'var(--bg-surface-alt)', padding: '14px 18px', borderRadius: 'var(--radius-md)', marginBottom: '14px', borderLeft: '4px solid var(--accent-500)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '4px' }}>
              Identified Subject
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
              {analysis.main_topic || project.title}
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', lineHeight: '1.65', color: 'var(--text-main)' }}>
            {analysis.summary}
          </p>
        </div>

        {/* Card 2: Sensitivity & Target Audience */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
              <ShieldAlert size={18} color="var(--accent-600)" />
              Sensitivity & Demographic Profile
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Classification & Sensitivity:
              </span>
              <div style={{ marginTop: '4px' }}>
                <span className="badge badge-warning" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                  {analysis.potential_sensitivity || "Standard Public Information"}
                </span>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Detected Target Audience:
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                {analysis.detected_audience || project.config?.target_audience}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Calibrated Delivery Tone:
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--accent-600)', marginTop: '4px' }}>
                {project.config?.tone || 'Formal'}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Key Facts */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
              <CheckCircle2 size={18} color="var(--success-600)" />
              Extracted Key Facts
            </h3>
            <span className="badge badge-neutral">{analysis.key_facts?.length || 0} Facts</span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analysis.key_facts?.map((fact, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', lineHeight: '1.5' }}>
                <span style={{ color: 'var(--accent-500)', fontWeight: 700 }}>•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 4: Key Messages */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
              <Layers size={18} color="var(--green-500)" />
              Core Takeaways & Directives
            </h3>
            <span className="badge badge-neutral">{analysis.key_messages?.length || 0} Messages</span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analysis.key_messages?.map((msg, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', lineHeight: '1.5' }}>
                <CheckCircle2 size={14} color="var(--success-600)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{msg}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 5: Extracted Entities */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
              <Building2 size={18} color="var(--accent-500)" />
              Extracted Entities & Authorities
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {entities.organizations && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Organizations / Bodies:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {entities.organizations.map((org, i) => (
                    <span key={i} className="badge badge-info">{org}</span>
                  ))}
                </div>
              </div>
            )}

            {entities.locations && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Jurisdictions & Locations:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {entities.locations.map((loc, i) => (
                    <span key={i} className="badge badge-neutral">{loc}</span>
                  ))}
                </div>
              </div>
            )}

            {entities.regulations && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Statutory Regulations:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                  {entities.regulations.map((reg, i) => (
                    <span key={i} className="badge badge-accent">{reg}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 6: Important Events & Timeline */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '1.05rem' }}>
              <Clock size={18} color="var(--green-500)" />
              Timeline & Critical Deadlines
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {analysis.important_events?.map((ev, idx) => (
              <div key={idx} style={{ padding: '8px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-500)' }}>
                <span style={{ fontSize: '0.725rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--accent-600)' }}>
                  {ev.time}
                </span>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '2px', fontWeight: 500 }}>
                  {ev.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View Original Source Modal */}
      <Modal 
        isOpen={showSourceModal} 
        onClose={() => setShowSourceModal(false)}
        title={`Original Source Document: ${project.source_name || project.title}`}
        maxWidth="840px"
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              Raw unmodified text submitted for AI ingestion
            </span>
            <span className="badge badge-neutral">{project.word_count || 450} words</span>
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
            maxHeight: '60vh',
            overflowY: 'auto'
          }}>
            {project.source_text || "No raw text available."}
          </pre>
        </div>
      </Modal>
    </div>
  );
}
