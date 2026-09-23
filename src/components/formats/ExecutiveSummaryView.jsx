import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { copyToClipboard, downloadAsText } from '../../utils/exportUtils';

export default function ExecutiveSummaryView({ data, project, onNotify }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [summaryData, setSummaryData] = useState(data || {});

  const handleCopy = async () => {
    const textToCopy = `EXECUTIVE SUMMARY: ${project?.title || 'Administrative Brief'}\n\n` +
      `OVERVIEW:\n${summaryData.overview}\n\n` +
      `KEY FINDINGS:\n${summaryData.key_findings?.map(f => `• ${f}`).join('\n')}\n\n` +
      `IMPLICATIONS:\n${summaryData.implications?.map(i => `• ${i}`).join('\n')}\n\n` +
      `RECOMMENDED ACTIONS:\n${summaryData.recommended_actions?.map(a => `[${a.priority}] ${a.action} (Lead: ${a.owner})`).join('\n')}`;

    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setCopied(true);
      onNotify?.("Executive summary copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = `========================================================\n` +
      `S.U.T.R.A. EXECUTIVE BRIEFING\n` +
      `Project: ${project?.title}\n` +
      `Date: ${new Date().toLocaleDateString('en-GB')}\n` +
      `Audience: ${project?.config?.target_audience}\n` +
      `========================================================\n\n` +
      `1. OVERVIEW:\n${summaryData.overview}\n\n` +
      `2. KEY FINDINGS:\n${summaryData.key_findings?.map((f, i) => `${i+1}. ${f}`).join('\n')}\n\n` +
      `3. STRATEGIC IMPLICATIONS:\n${summaryData.implications?.map((m, i) => `${i+1}. ${m}`).join('\n')}\n\n` +
      `4. RECOMMENDED ACTION MATRIX:\n` +
      summaryData.recommended_actions?.map(a => `[${a.priority}] ${a.action} | Lead: ${a.owner}`).join('\n') +
      `\n\nSOURCES & VERIFICATION:\n` +
      summaryData.sources?.join(', ');

    downloadAsText(`${project?.title?.replace(/[^a-zA-Z0-9]/g, '_')}_Executive_Summary.txt`, content);
    onNotify?.("Executive summary downloaded", "success");
  };

  if (!summaryData.overview) {
    return <div className="card text-muted">No executive summary available for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-info">Executive Summary</span>
          <span className="badge badge-neutral">Audience: {project?.config?.target_audience || 'Leadership'}</span>
          <span className="badge badge-neutral">Tone: {project?.config?.tone || 'Formal'}</span>
        </div>

        <div className="output-actions-group">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setIsEditing(!isEditing)}
            title="Edit in-place"
          >
            <Edit3 size={14} /> {isEditing ? "Done Editing" : "Edit"}
          </button>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={handleCopy}
            title="Copy executive brief"
          >
            {copied ? <Check size={14} color="var(--success-600)" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleDownload}
            title="Download formatted text"
          >
            <Download size={14} /> Download Brief
          </button>
        </div>
      </div>

      <div className="output-body">
        {/* Executive Overview Box */}
        <div className="exec-overview-box">
          <div className="exec-section-title">
            <FileText size={18} color="var(--accent-500)" />
            Overview & Executive Context
          </div>
          {isEditing ? (
            <textarea
              className="form-textarea"
              value={summaryData.overview}
              onChange={(e) => setSummaryData({ ...summaryData, overview: e.target.value })}
              style={{ minHeight: '90px' }}
            />
          ) : (
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              {summaryData.overview}
            </p>
          )}
        </div>

        <div className="exec-summary-grid">
          {/* Left Column: Key Findings & Implications */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="exec-section-title">
                <CheckCircle2 size={18} color="var(--success-600)" />
                Key Findings
              </div>
              <ul className="exec-key-facts-list">
                {summaryData.key_findings?.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="exec-section-title">
                <AlertCircle size={18} color="var(--accent-500)" />
                Strategic Implications
              </div>
              <ul className="exec-key-facts-list">
                {summaryData.implications?.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Recommended Actions Table */}
          <div>
            <div className="exec-section-title">
              Action Plan Matrix
            </div>
            <table className="exec-actions-table">
              <thead>
                <tr>
                  <th>Priority</th>
                  <th>Action Required</th>
                  <th>Responsible Entity</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.recommended_actions?.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`badge ${item.priority.includes('P0') ? 'badge-warning' : 'badge-info'}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td style={{ fontWeight: 500 }}>{item.action}</td>
                    <td style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>{item.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sources & Citations */}
            {summaryData.sources && (
              <div style={{ marginTop: '24px', padding: '12px 14px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-dim)' }}>
                  Verified Citations
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {summaryData.sources.map((src, i) => (
                    <span key={i} className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
