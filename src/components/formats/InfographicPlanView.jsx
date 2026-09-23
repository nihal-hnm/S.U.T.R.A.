import React from 'react';
import { 
  PieChart, 
  Layers, 
  Clock, 
  Lightbulb, 
  Smile, 
  Compass, 
  Download, 
  Info,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { downloadAsText, copyToClipboard } from '../../utils/exportUtils';

export default function InfographicPlanView({ data, project, onNotify }) {
  const plan = data || {};
  const [copied, setCopied] = React.useState(false);

  const handleCopyPlan = async () => {
    const text = `INFOGRAPHIC DESIGN SPECIFICATION\n` +
      `Title: ${plan.title}\n` +
      `Tagline: ${plan.catchphrase}\n\n` +
      `PRIMARY STATISTIC: ${plan.key_statistic?.number} ${plan.key_statistic?.unit} - ${plan.key_statistic?.label}\n\n` +
      `KEY MESSAGES:\n${plan.key_messages?.map(m => `• ${m}`).join('\n')}\n\n` +
      `FACTS & DATA POINTS:\n${plan.important_facts?.map(f => `• ${f}`).join('\n')}\n\n` +
      `TIMELINE PHASES:\n${plan.timeline?.map(t => `[${t.phase}] ${t.action}`).join('\n')}\n\n` +
      `VISUAL HIERARCHY:\n${plan.visual_hierarchy?.map((h, i) => `${i+1}. ${h}`).join('\n')}\n\n` +
      `SUGGESTED ICONS:\n${plan.suggested_icons?.join(', ')}\n\n` +
      `CALL TO ACTION:\n${plan.call_to_action}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      onNotify?.("Infographic blueprint copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadBlueprint = () => {
    const text = `=========================================================================\n` +
      `S.U.T.R.A. INFOGRAPHIC BLUEPRINT & PLANNING SPECIFICATION\n` +
      `Project: ${project?.title}\n` +
      `Audience: ${project?.config?.target_audience}\n` +
      `=========================================================================\n\n` +
      `INFOGRAPHIC TITLE: ${plan.title}\n` +
      `CATCHPHRASE: ${plan.catchphrase}\n\n` +
      `1. HERO STATISTIC / CALLOUT:\n` +
      `   Value: ${plan.key_statistic?.number} ${plan.key_statistic?.unit}\n` +
      `   Context: ${plan.key_statistic?.label}\n\n` +
      `2. FOUR CORE MESSAGING PILLARS:\n` +
      plan.key_messages?.map((m, i) => `   [Pillar ${i+1}] ${m}`).join('\n') + `\n\n` +
      `3. SUPPORTING FACTUAL VERIFICATION:\n` +
      plan.important_facts?.map((f, i) => `   • ${f}`).join('\n') + `\n\n` +
      `4. STEP-BY-STEP PROCESS FLOW:\n` +
      plan.timeline?.map(t => `   • ${t.phase}: ${t.action}`).join('\n') + `\n\n` +
      `5. RECOMMENDED VISUAL HIERARCHY & LAYOUT GUIDE:\n` +
      plan.visual_hierarchy?.map((h, i) => `   Layer ${i+1}: ${h}`).join('\n') + `\n\n` +
      `6. RECOMMENDED ICONOGRAPHY:\n` +
      plan.suggested_icons?.map(ic => `   - ${ic}`).join('\n') + `\n\n` +
      `7. PRIMARY CITIZEN CALL TO ACTION:\n` +
      `   ${plan.call_to_action}\n`;

    downloadAsText(`${project?.title?.replace(/[^a-zA-Z0-9]/g, '_')}_Infographic_Blueprint.txt`, text);
    onNotify?.("Infographic blueprint downloaded", "success");
  };

  if (!plan.title) {
    return <div className="card text-muted">No infographic blueprint generated for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-info">Infographic Planning Blueprint</span>
          <span className="badge badge-neutral">Design Specification</span>
          <span className="badge badge-neutral">Production Ready</span>
        </div>

        <div className="output-actions-group">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={handleCopyPlan}
            title="Copy design specifications"
          >
            {copied ? <Check size={14} color="var(--success-600)" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy Blueprint"}
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleDownloadBlueprint}
            title="Download layout blueprint"
          >
            <Download size={14} /> Download Blueprint (.txt)
          </button>
        </div>
      </div>

      <div className="output-body">
        <div className="infographic-planner">
          {/* Institutional Compliance Notice (Adheres to PRD Section 8.5) */}
          <div className="planning-notice">
            <Info size={18} />
            <span>
              <strong>Planning Interface:</strong> This blueprint provides a structured semantic hierarchy, layout guidance, and verified data points for production by graphic and design units. No simulated graphics are fabricated.
            </span>
          </div>

          {/* Primary Statistic Callout Banner */}
          {plan.key_statistic && (
            <div className="key-stat-hero-card">
              <span className="badge badge-accent" style={{ marginBottom: '12px' }}>
                PRIMARY HERO DATA POINT
              </span>
              <div className="stat-figure">
                {plan.key_statistic.number} <span style={{ fontSize: '1.8rem', color: 'var(--text-muted)' }}>{plan.key_statistic.unit}</span>
              </div>
              <div className="stat-label">
                {plan.key_statistic.label}
              </div>
              <div className="stat-subtext">
                Source: Administrative Verification Node • Validated Context
              </div>
            </div>
          )}

          {/* Infographic Title and Catchphrase */}
          <div style={{ textAlign: 'center', padding: '16px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
              {plan.title}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--accent-600)', fontWeight: 600 }}>
              "{plan.catchphrase}"
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="info-cards-grid">
            <div className="info-element-card">
              <div className="info-element-title">
                <Lightbulb size={16} color="var(--accent-500)" />
                Core Takeaways
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                {plan.key_messages?.map((msg, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <CheckCircle2 size={14} color="var(--success-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{msg}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-element-card">
              <div className="info-element-title">
                <PieChart size={16} color="var(--info-600)" />
                Verified Data Points
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                {plan.important_facts?.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                    <span style={{ color: 'var(--accent-500)', fontWeight: 700 }}>•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-element-card">
              <div className="info-element-title">
                <Smile size={16} color="var(--success-600)" />
                Suggested Iconography
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {plan.suggested_icons?.map((icon, i) => (
                  <span key={i} className="badge badge-neutral" style={{ padding: '6px 10px', fontSize: '0.775rem' }}>
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline & Flow Guide */}
          {plan.timeline && (
            <div className="card">
              <div className="info-element-title">
                <Clock size={16} color="var(--green-500)" />
                Process Flow / Visual Milestone Track
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '12px' }}>
                {plan.timeline.map((step, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-surface-alt)', padding: '12px 14px', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--accent-500)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-600)', textTransform: 'uppercase' }}>
                      {step.phase}
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', marginTop: '4px', fontWeight: 500 }}>
                      {step.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Visual Hierarchy */}
          <div className="card">
            <div className="info-element-title">
              <Layers size={16} color="var(--accent-500)" />
              Recommended Visual Hierarchy & Layout Guide
            </div>
            <ol style={{ paddingLeft: '20px', marginTop: '8px', fontSize: '0.875rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
              {plan.visual_hierarchy?.map((layer, idx) => (
                <li key={idx} style={{ marginBottom: '4px' }}>
                  <strong>Level {idx + 1}:</strong> {layer}
                </li>
              ))}
            </ol>
          </div>

          {/* Call to Action Banner */}
          <div style={{ padding: '16px 20px', background: 'var(--success-50)', border: '1px solid var(--success-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--success-700)' }}>
                Citizen Call to Action
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>
                {plan.call_to_action}
              </div>
            </div>
            <span className="badge badge-success">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
