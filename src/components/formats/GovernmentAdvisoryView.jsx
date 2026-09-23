import React, { useState } from 'react';
import { 
  FileCheck, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Eye, 
  AlertTriangle,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { copyToClipboard, downloadAsText, printElement } from '../../utils/exportUtils';
import Modal from '../Modal';

export default function GovernmentAdvisoryView({ data, project, onNotify }) {
  const [copied, setCopied] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const advisory = data || {};

  const handleCopy = async () => {
    const text = `GOVERNMENT ADVISORY\n` +
      `REF: ${advisory.ref_number} | DATE: ${advisory.date}\n` +
      `ISSUED BY: ${advisory.issuing_authority} - ${advisory.department}\n\n` +
      `SUBJECT: ${project?.title}\n\n` +
      `1. SITUATION OVERVIEW:\n${advisory.situation_overview}\n\n` +
      `2. KEY INFORMATION:\n${advisory.key_information}\n\n` +
      `3. AFFECTED AREAS/ENTITIES:\n${advisory.affected_areas?.map(a => `• ${a}`).join('\n')}\n\n` +
      `4. RECOMMENDED ACTIONS:\n${advisory.recommended_actions?.map(a => `• ${a}`).join('\n')}\n\n` +
      `5. PUBLIC GUIDANCE:\n${advisory.public_guidance}\n\n` +
      `EMERGENCY CONTACTS:\n${advisory.emergency_contacts?.map(c => `${c.service}: ${c.contact}`).join('\n')}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      onNotify?.("Government advisory copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const text = `=========================================================================\n` +
      `                      OFFICIAL GOVERNMENT ADVISORY                        \n` +
      `                      [AUTHENTICATED ADMINISTRATIVE CIRCULAR]             \n` +
      `=========================================================================\n\n` +
      `REF NO: ${advisory.ref_number}               DATE: ${advisory.date}\n` +
      `AUTHORITY: ${advisory.issuing_authority}\n` +
      `DEPARTMENT: ${advisory.department}\n\n` +
      `SUBJECT: ${project?.title}\n\n` +
      `1. SITUATION OVERVIEW\n-------------------------------------------------------------------------\n` +
      `${advisory.situation_overview}\n\n` +
      `2. KEY INFORMATION & DIRECTIVES\n-------------------------------------------------------------------------\n` +
      `${advisory.key_information}\n\n` +
      `3. AFFECTED JURISDICTIONS / POPULATIONS\n-------------------------------------------------------------------------\n` +
      advisory.affected_areas?.map((a, i) => `${i+1}. ${a}`).join('\n') + `\n\n` +
      `4. IMPACT ASSESSMENT\n-------------------------------------------------------------------------\n` +
      `${advisory.potential_impact}\n\n` +
      `5. DIRECTIVES & ACTIONS FOR AUTHORITIES\n-------------------------------------------------------------------------\n` +
      advisory.recommended_actions?.map((r, i) => `[${i+1}] ${r}`).join('\n') + `\n\n` +
      `6. PUBLIC GUIDANCE & SAFETY DIRECTIVES\n-------------------------------------------------------------------------\n` +
      `${advisory.public_guidance}\n\n` +
      `7. 24x7 EMERGENCY & CITIZEN HELPLINES\n-------------------------------------------------------------------------\n` +
      advisory.emergency_contacts?.map(c => `• ${c.service}: ${c.contact}`).join('\n');

    downloadAsText(`${advisory.ref_number?.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Advisory.txt`, text);
    onNotify?.("Official advisory downloaded", "success");
  };

  if (!advisory.ref_number) {
    return <div className="card text-muted">No advisory data generated for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-warning">Official Advisory</span>
          <span className="badge badge-neutral">Ref: {advisory.ref_number}</span>
          <span className="badge badge-neutral">Date: {advisory.date}</span>
        </div>

        <div className="output-actions-group">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setShowPreviewModal(true)}
            title="Preview formal printable document"
          >
            <Eye size={14} /> Preview Document
          </button>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={handleCopy}
            title="Copy advisory text"
          >
            {copied ? <Check size={14} color="var(--success-600)" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleDownload}
            title="Download official text circular"
          >
            <Download size={14} /> Download Advisory
          </button>
        </div>
      </div>

      <div className="output-body" style={{ background: 'var(--bg-app)', padding: '24px' }}>
        {/* Render Official Document Layout */}
        <div id="printable-advisory" className="advisory-doc-container">
          <div className="advisory-header-mast">
            <div className="advisory-org-title">{advisory.issuing_authority}</div>
            <div className="advisory-sub-org">{advisory.department}</div>
            
            <div className="advisory-ref-bar">
              <span>REF NO: <strong>{advisory.ref_number}</strong></span>
              <span>DATED: <strong>{advisory.date}</strong></span>
            </div>
          </div>

          <div className="advisory-title-banner">
            ADVISORY: {project?.title?.toUpperCase()}
          </div>

          <div className="advisory-section">
            <div className="advisory-sec-heading">1. SITUATION OVERVIEW</div>
            <p>{advisory.situation_overview}</p>
          </div>

          <div className="advisory-alert-callout">
            <AlertTriangle size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} />
            {advisory.key_information}
          </div>

          <div className="advisory-section">
            <div className="advisory-sec-heading">2. AFFECTED AREAS & POPULATIONS</div>
            <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
              {advisory.affected_areas?.map((area, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{area}</li>
              ))}
            </ul>
          </div>

          <div className="advisory-section">
            <div className="advisory-sec-heading">3. POTENTIAL IMPACT</div>
            <p>{advisory.potential_impact}</p>
          </div>

          <div className="advisory-section">
            <div className="advisory-sec-heading">4. DIRECTIVES & ACTIONS FOR AUTHORITIES</div>
            <ol style={{ paddingLeft: '20px', marginTop: '6px' }}>
              {advisory.recommended_actions?.map((act, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>{act}</li>
              ))}
            </ol>
          </div>

          <div className="advisory-section">
            <div className="advisory-sec-heading">5. CITIZEN GUIDANCE & ADVISORY PROTOCOL</div>
            <p>{advisory.public_guidance}</p>
          </div>

          <div className="advisory-section" style={{ borderTop: '1px solid #CBD5E1', paddingTop: '16px', marginTop: '24px' }}>
            <div className="advisory-sec-heading" style={{ border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneCall size={16} />
              24x7 EMERGENCY COORDINATION DESKS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '10px' }}>
              {advisory.emergency_contacts?.map((item, idx) => (
                <div key={idx} style={{ background: 'var(--bg-surface-alt)', padding: '10px 14px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>{item.service}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>{item.contact}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Preview & Print Modal */}
      <Modal 
        isOpen={showPreviewModal} 
        onClose={() => setShowPreviewModal(false)}
        title="Document Preview & Print Mode"
        maxWidth="880px"
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Standard institutional print layout with strict black-and-white print styles.
            </span>
            <button 
              className="btn btn-primary btn-sm" 
              onClick={() => printElement('printable-advisory')}
            >
              <Printer size={16} /> Print / Save as PDF
            </button>
          </div>

          <div style={{ border: '1px solid var(--border-default)', padding: '24px', background: '#FFFFFF', color: '#000000', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase' }}>{advisory.issuing_authority}</h2>
              <div style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>{advisory.department}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '12px', fontFamily: 'monospace' }}>
                <span>CIRCULAR REF: {advisory.ref_number}</span>
                <span>DATE: {advisory.date}</span>
              </div>
            </div>
            <div style={{ margin: '16px 0', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', background: '#f2f2f2', padding: '6px' }}>
              {project?.title?.toUpperCase()}
            </div>
            <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              <p><strong>1. SITUATION OVERVIEW:</strong> {advisory.situation_overview}</p>
              <p style={{ marginTop: '10px' }}><strong>2. KEY DIRECTIVES:</strong> {advisory.key_information}</p>
              <p style={{ marginTop: '10px' }}><strong>3. PUBLIC GUIDANCE:</strong> {advisory.public_guidance}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
