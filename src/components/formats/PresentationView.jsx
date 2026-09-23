import React, { useState } from 'react';
import { 
  Presentation as PresIcon, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { downloadAsText, copyToClipboard } from '../../utils/exportUtils';
import Modal from '../Modal';

export default function PresentationView({ data, project, onNotify }) {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [copied, setCopied] = useState(false);

  const presentation = data || {};
  const slides = presentation.slides || [];
  const currentSlide = slides[currentSlideIdx] || {};

  const handleNext = () => {
    if (currentSlideIdx < slides.length - 1) {
      setCurrentSlideIdx(currentSlideIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(currentSlideIdx - 1);
    }
  };

  const handleDownloadDeck = () => {
    const text = `=========================================================================\n` +
      `S.U.T.R.A. PRESENTATION SLIDE DECK OUTLINE\n` +
      `Topic: ${project?.title}\n` +
      `Target Audience: ${project?.config?.target_audience}\n` +
      `Total Slides: ${slides.length}\n` +
      `=========================================================================\n\n` +
      slides.map((s) => (
        `[SLIDE ${s.slide_number}: ${s.title.toUpperCase()}]\n` +
        `Subtitle: ${s.subtitle}\n` +
        `Bullets:\n${s.bullets?.map(b => `  • ${b}`).join('\n')}\n` +
        `Speaker Notes:\n  ${s.speaker_notes}\n\n` +
        `-------------------------------------------------------------------------\n`
      )).join('\n');

    downloadAsText(`${project?.title?.replace(/[^a-zA-Z0-9]/g, '_')}_Slides_Deck.txt`, text);
    onNotify?.("Presentation deck outline downloaded", "success");
  };

  if (!slides.length) {
    return <div className="card text-muted">No presentation slides generated for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-info">Presentation Deck</span>
          <span className="badge badge-neutral">Slide {currentSlideIdx + 1} of {slides.length}</span>
          <span className="badge badge-neutral">6 Structured Cards</span>
        </div>

        <div className="output-actions-group">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setShowFullscreenModal(true)}
            title="Launch interactive presentation viewer"
          >
            <Maximize2 size={14} /> Preview Presentation
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleDownloadDeck}
            title="Download slide outline"
          >
            <Download size={14} /> Download Slides (.txt)
          </button>
        </div>
      </div>

      <div className="output-body">
        <div className="presentation-container">
          {/* Active Interactive Slide Showcase */}
          <div className="slide-deck-preview">
            <div>
              <div className="slide-masthead">
                <span className="slide-counter">SLIDE {currentSlide.slide_number} / {slides.length}</span>
                <span style={{ fontSize: '0.75rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {project?.title?.slice(0, 45)}...
                </span>
              </div>

              <h2 className="slide-title">{currentSlide.title}</h2>
              {currentSlide.subtitle && (
                <div style={{ fontSize: '1rem', color: 'var(--accent-500)', fontWeight: 600, marginBottom: '20px' }}>
                  {currentSlide.subtitle}
                </div>
              )}

              <ul className="slide-bullets">
                {currentSlide.bullets?.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                S.U.T.R.A. AI Briefing Module
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={handlePrev}
                  disabled={currentSlideIdx === 0}
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  <ChevronLeft size={16} /> Prev
                </button>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={handleNext}
                  disabled={currentSlideIdx === slides.length - 1}
                  style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Speaker Notes Callout */}
          <div className="speaker-notes-box">
            <div className="speaker-notes-title">
              <FileText size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Presenter & Speaker Notes
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{currentSlide.speaker_notes}"
            </p>
          </div>

          {/* Slide Deck Grid Thumbnails */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-dim)', marginBottom: '10px' }}>
              All Slides in Deck (Click to Navigate)
            </div>
            <div className="slide-cards-grid">
              {slides.map((s, idx) => (
                <div 
                  key={s.slide_number}
                  className={`slide-mini-card ${idx === currentSlideIdx ? 'active' : ''}`}
                  onClick={() => setCurrentSlideIdx(idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-600)', fontFamily: 'var(--font-mono)' }}>
                      #{s.slide_number}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      {s.bullets?.length || 0} bullets
                    </span>
                  </div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.subtitle || s.bullets?.[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Presentation Fullscreen Modal */}
      <Modal 
        isOpen={showFullscreenModal} 
        onClose={() => setShowFullscreenModal(false)}
        title="Interactive Presentation Mode"
        maxWidth="900px"
      >
        <div style={{ background: 'var(--bg-surface)', color: 'var(--text-main)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-default)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '24px' }}>
            <span style={{ color: 'var(--accent-500)', fontWeight: 700, fontFamily: 'monospace' }}>
              SLIDE {currentSlide.slide_number} OF {slides.length}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Use Prev / Next buttons to navigate</span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '10px' }}>{currentSlide.title}</h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--accent-500)', marginBottom: '24px' }}>{currentSlide.subtitle}</div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {currentSlide.bullets?.map((b, i) => (
              <li key={i} style={{ paddingLeft: '20px', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent-500)' }}>•</span>
                {b}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border-light)' }}>
            <button 
              className="btn btn-outline"
              onClick={handlePrev}
              disabled={currentSlideIdx === 0}
            >
              Previous Slide
            </button>
            <div style={{ display: 'flex', gap: '6px' }}>
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentSlideIdx(i)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: i === currentSlideIdx ? 'var(--accent-500)' : 'var(--border-strong)',
                    cursor: 'pointer'
                  }} 
                />
              ))}
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleNext}
              disabled={currentSlideIdx === slides.length - 1}
            >
              Next Slide
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
