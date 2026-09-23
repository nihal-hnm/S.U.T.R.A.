import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  ChevronDown,
  Layers,
  FileText,
  Sliders,
  Shield,
  Keyboard,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Zap
} from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'What is S.U.T.R.A.?',
    answer: 'S.U.T.R.A. (Source → Understanding → Transformation → Response → Artifact) is an AI-powered government information transformation system. It takes a single source document — such as a disaster advisory, policy circular, or administrative guideline — and converts it into multiple audience-specific communication formats while maintaining factual consistency across all channels.',
    icon: <Sparkles size={18} color="var(--accent-500)" />,
  },
  {
    question: 'How does the 5-phase pipeline work?',
    answer: 'The pipeline processes documents through five deterministic phases: (1) Source Ingest — accepts text, PDFs, images, video, or URLs. (2) Understanding — extracts entities, facts, directives, and sensitivity classification. (3) Transformation — calibrates content for target audience, tone, and communication objective. (4) Response Format — generates outputs across 7 channel formats. (5) Artifact Delivery — packages verified, exportable communication artifacts with zero informational drift.',
    icon: <Layers size={18} color="var(--accent-500)" />,
  },
  {
    question: 'What input formats are supported?',
    answer: 'S.U.T.R.A. accepts five input modalities: (a) Direct text paste — administrative circulars, reports, or notes. (b) Document upload — PDF, DOCX, and TXT files up to 25MB. (c) Image upload — PNG and JPG scans of notices or infographics. (d) Video upload — MP4 recordings of press conferences. (e) Web URL — direct links to gazette notifications or public advisories.',
    icon: <FileText size={18} color="var(--accent-500)" />,
  },
  {
    question: 'What are the 7 output channels?',
    answer: 'The system generates: (1) Executive Summary — high-level brief with key findings and action matrix. (2) Government Advisory — official circular with reference numbers and helpline contacts. (3) LinkedIn Post — stakeholder-focused post with verified hooks. (4) X/Twitter Thread — numbered 280-character emergency notification chain. (5) Presentation Deck — 6-card briefing slides with speaker notes. (6) Infographic Blueprint — visual design architecture guide. (7) Video Package & Script — scene-by-scene broadcast breakdown with bilingual narration.',
    icon: <Layers size={18} color="var(--accent-500)" />,
  },
  {
    question: 'How do I customize output tone and audience?',
    answer: 'On the Create Transformation page, Section 3 allows you to configure: Target Audience (General Public, Government Officials, Senior Officials, Media, Technical Teams, Students, Businesses), Communication Tone (Formal, Professional, Neutral, Informative, Conversational, Urgent), Language (English, Hindi, Hinglish), Communication Objective (Inform, Educate, Alert, Summarize, Explain, Public Awareness), and Level of Detail (Brief, Standard, Detailed).',
    icon: <Sliders size={18} color="var(--accent-500)" />,
  },
  {
    question: 'How is data privacy handled?',
    answer: 'S.U.T.R.A. is designed as a frontend prototype for demonstration. In production, all AI processing would be routed through Firebase Cloud Functions — no API keys are stored or called from the frontend. Source documents are processed in-session and stored locally in browser storage only. No data is transmitted to external servers in the prototype version.',
    icon: <Shield size={18} color="var(--accent-500)" />,
  },
];

const SHORTCUTS = [
  { key: 'Ctrl + N', action: 'New Transformation' },
  { key: 'Ctrl + K', action: 'Quick Search' },
  { key: 'Ctrl + D', action: 'Go to Dashboard' },
  { key: 'Ctrl + H', action: 'Project History' },
  { key: 'Ctrl + ,', action: 'Open Settings' },
  { key: 'Esc', action: 'Close Modal / Overlay' },
];

const QUICK_START = [
  {
    step: '01',
    title: 'Load a Sample Source',
    desc: 'Click "New Transformation" in the sidebar, then use one of the pre-loaded sample scenarios (Flood Alert, Health Policy, or Cyber Advisory) to see the pipeline in action.',
  },
  {
    step: '02',
    title: 'Configure Output Parameters',
    desc: 'Select your target audience, communication tone, and language preferences. Choose which of the 7 output formats to generate.',
  },
  {
    step: '03',
    title: 'Generate Communication Artifacts',
    desc: 'Click "Generate Communication" and watch the 5-phase pipeline process your source. The system analyzes, calibrates, and synthesizes verified artifacts.',
  },
  {
    step: '04',
    title: 'Review, Comment & Export',
    desc: 'Browse generated outputs across tabs. Add review comments, regenerate with different parameters, or export the full bundle as JSON.',
  },
];

export default function HelpCenterPage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="page-container" style={{ maxWidth: '960px' }}>
      <div className="page-header">
        <div className="page-title-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-neutral">Reference</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Documentation & Quick Start</span>
          </div>
          <h1 className="page-title">Help Center</h1>
          <p className="page-subtitle">
            Operational reference, quick-start guide, and keyboard shortcuts for the S.U.T.R.A. transformation system.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onNavigate('create')}
        >
          <Zap size={16} /> Start Transformation
        </button>
      </div>

      {/* Quick Start Guide */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">
            <BookOpen size={18} color="var(--accent-500)" />
            Quick Start Guide
          </h2>
          <span className="badge badge-accent">4 Steps</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
        }}>
          {QUICK_START.map((item) => (
            <div
              key={item.step}
              className="animate-fade-in-up"
              style={{
                padding: '18px',
                background: 'var(--bg-surface-alt)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span className="pipeline-step-pill">{item.step}</span>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.title}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">
            <HelpCircle size={18} color="var(--accent-500)" />
            Frequently Asked Questions
          </h2>
          <span className="badge badge-neutral">{FAQ_ITEMS.length} Topics</span>
        </div>

        <div className="help-accordion">
          {FAQ_ITEMS.map((faq, idx) => (
            <div
              key={idx}
              className={`help-accordion-item ${openFaq === idx ? 'open' : ''}`}
            >
              <button
                className="help-accordion-trigger"
                onClick={() => toggleFaq(idx)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {faq.icon}
                  {faq.question}
                </span>
                <ChevronDown size={16} className="chevron" />
              </button>
              <div className="help-accordion-content">
                <div className="help-accordion-body">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <h2 className="card-title">
            <Keyboard size={18} color="var(--accent-500)" />
            Keyboard Shortcuts
          </h2>
        </div>

        <table className="help-shortcut-table">
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {SHORTCUTS.map((s, idx) => (
              <tr key={idx}>
                <td><kbd style={{
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-default)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                }}>{s.key}</kbd></td>
                <td style={{ color: 'var(--text-main)' }}>{s.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact / Feedback */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <MessageSquare size={18} color="var(--accent-500)" />
            Feedback & Support
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', padding: '16px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '6px' }}>
              Report an Issue
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
              Found a bug or have a suggestion? Submit feedback to the engineering team.
            </p>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Feedback form placeholder — would integrate with ticketing system in production.')}>
              Open Feedback Form
            </button>
          </div>
          <div style={{ flex: '1 1 300px', padding: '16px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '6px' }}>
              Documentation
            </div>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '0 0 12px', lineHeight: 1.5 }}>
              Full technical documentation for API integration and deployment architecture.
            </p>
            <button className="btn btn-outline btn-sm" onClick={() => alert('Documentation portal placeholder — would link to technical docs in production.')}>
              View Technical Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
