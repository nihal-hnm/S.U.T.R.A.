import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';

const DEFAULT_TRAIL = [
  { time: 'T+0s', label: 'Source document submitted for transformation', type: 'info', meta: 'Operator initiated pipeline' },
  { time: 'T+1.2s', label: 'Source ingestion & format detection complete', type: 'success', meta: 'Text input · English detected' },
  { time: 'T+3.8s', label: 'Semantic analysis & entity extraction complete', type: 'success', meta: '6 entities · 4 key facts · 3 directives' },
  { time: 'T+5.1s', label: 'Audience calibration & tone adjustment applied', type: 'success', meta: 'General Public · Professional tone' },
  { time: 'T+8.4s', label: 'Multi-channel artifact generation complete', type: 'success', meta: '7 formats synthesized' },
  { time: 'T+9.0s', label: 'Verification & consistency audit passed', type: 'success', meta: 'Zero informational drift detected' },
  { time: 'T+9.2s', label: 'Artifacts ready for review & export', type: 'info', meta: 'All channels operational' },
];

export default function AuditTrailPanel({ trail = DEFAULT_TRAIL, projectCreatedAt }) {
  const [expanded, setExpanded] = useState(false);
  const displayTrail = expanded ? trail : trail.slice(0, 4);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title" style={{ fontSize: '1rem' }}>
          <Clock size={18} color="var(--accent-500)" />
          Transformation Audit Trail
        </h3>
        <span className="badge badge-neutral">{trail.length} Events</span>
      </div>

      {projectCreatedAt && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '14px' }}>
          Session initiated: {new Date(projectCreatedAt).toLocaleString()}
        </div>
      )}

      <div className="audit-trail">
        {displayTrail.map((item, idx) => (
          <div
            key={idx}
            className={`audit-item ${item.type === 'success' ? 'audit-success' : 'audit-info'}`}
          >
            <span className="audit-time">{item.time}</span>
            <span className="audit-label">{item.label}</span>
            {item.meta && <span className="audit-meta">{item.meta}</span>}
          </div>
        ))}
      </div>

      {trail.length > 4 && (
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setExpanded(!expanded)}
          style={{ marginTop: '12px', width: '100%' }}
        >
          {expanded ? (
            <><ChevronUp size={14} /> Show Less</>
          ) : (
            <><ChevronDown size={14} /> Show All {trail.length} Events</>
          )}
        </button>
      )}
    </div>
  );
}
