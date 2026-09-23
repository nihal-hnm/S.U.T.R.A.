import React, { useState } from 'react';
import { Sparkles, FileText, Layers, ArrowRight, X, Zap, Target } from 'lucide-react';

const STEPS = [
  {
    icon: <Sparkles size={32} color="var(--accent-500)" />,
    title: 'Welcome to S.U.T.R.A.',
    subtitle: 'Source → Understanding → Transformation → Response → Artifact',
    description: 'An AI-powered system that transforms a single government source document into multiple audience-specific communication formats — executive summaries, advisories, social posts, presentations, and broadcast packages.',
  },
  {
    icon: <FileText size={32} color="var(--accent-500)" />,
    title: 'Step 1 — Submit Your Source',
    subtitle: 'Paste text, upload PDFs, or provide a URL',
    description: 'Start by providing any official document: disaster advisories, policy circulars, health bulletins, or administrative guidelines. S.U.T.R.A. accepts text, documents, images, video, and web URLs.',
  },
  {
    icon: <Zap size={32} color="var(--accent-500)" />,
    title: 'Step 2 — AI Analysis Pipeline',
    subtitle: '5-phase deterministic transformation',
    description: 'The system ingests, analyzes entities and directives, calibrates audience tone, generates multi-format outputs, and verifies consistency — all automatically with zero informational drift.',
  },
  {
    icon: <Target size={32} color="var(--accent-500)" />,
    title: 'Step 3 — Review & Export',
    subtitle: '7 verified communication channels',
    description: 'Review generated artifacts across Executive Summary, Government Advisory, LinkedIn Post, X/Twitter Thread, Presentation Deck, Infographic Blueprint, and Video Package formats. Export individually or as a unified bundle.',
  },
];

export default function OnboardingOverlay({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(true);

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleComplete = () => {
    if (dontShowAgain) {
      localStorage.setItem('sutra_onboarded', 'true');
    }
    onComplete();
  };

  return (
    <div className="onboarding-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) handleComplete();
    }}>
      <div className="onboarding-card">
        {/* Close button */}
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 1 }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={handleComplete}
            style={{ padding: '4px 6px', border: 'none' }}
            aria-label="Close onboarding"
          >
            <X size={16} />
          </button>
        </div>

        <div className="onboarding-header">
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--bg-surface-alt)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            {step.icon}
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
          }}>
            {step.title}
          </h2>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent-500)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            {step.subtitle}
          </span>
        </div>

        <div className="onboarding-body">
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: '440px',
            margin: '0 auto',
          }}>
            {step.description}
          </p>
        </div>

        <div className="onboarding-footer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <div className="onboarding-dots">
              {STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`onboarding-dot ${idx === currentStep ? 'active' : ''}`}
                />
              ))}
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                style={{ width: '14px', height: '14px' }}
              />
              Don't show again
            </label>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {currentStep > 0 && (
              <button
                className="btn btn-outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </button>
            )}
            <button
              className="btn btn-primary"
              onClick={handleNext}
            >
              {isLast ? 'Get Started' : 'Next'} <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
