import React, { useState } from 'react';
import { 
  Video, 
  Clock, 
  Download, 
  Film, 
  Mic, 
  Tv, 
  Eye, 
  Copy, 
  Check, 
  Languages,
  ArrowRight
} from 'lucide-react';
import { downloadAsText, copyToClipboard } from '../../utils/exportUtils';
import Modal from '../Modal';

export default function VideoPackageView({ data, project, onNotify }) {
  const [activeLang, setActiveLang] = useState('en'); // 'en' | 'hi'
  const [showStoryboardModal, setShowStoryboardModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const video = data || {};
  const scenes = video.scenes || [];

  const handleCopyScript = async () => {
    const text = `VIDEO SCRIPT SPECIFICATION: ${video.title}\n` +
      `Duration: ${video.target_duration} | Audience: ${video.target_audience} | Tone: ${video.tone}\n\n` +
      scenes.map(s => (
        `[SCENE ${s.scene_number}: ${s.time_range}]\n` +
        `VISUAL: ${s.visual_description}\n` +
        `NARRATION (EN): "${s.narration_en}"\n` +
        `NARRATION (HI): "${s.narration_hi}"\n` +
        `ON-SCREEN TEXT: ${s.on_screen_text}\n` +
        `TRANSITION: ${s.transition}\n`
      )).join('\n----------------------------------------\n\n');

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      onNotify?.("Complete video production script copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadScript = () => {
    const text = `=========================================================================\n` +
      `S.U.T.R.A. VIDEO PRODUCTION SCRIPT & BROADCAST SPECIFICATION\n` +
      `Project: ${project?.title}\n` +
      `Video Title: ${video.title}\n` +
      `Target Run-time: ${video.target_duration}\n` +
      `Target Demographic: ${video.target_audience}\n` +
      `Auditory Tone: ${video.tone}\n` +
      `=========================================================================\n\n` +
      scenes.map(s => (
        `SCENE #${s.scene_number} (${s.time_range})\n` +
        `-------------------------------------------------------------------------\n` +
        `• VISUAL DIRECTION: ${s.visual_description}\n` +
        `• VOICE-OVER (ENGLISH): ${s.narration_en}\n` +
        `• VOICE-OVER (HINDI):   ${s.narration_hi}\n` +
        `• LOWER THIRD / TEXT:   ${s.on_screen_text}\n` +
        `• TRANSITION CUE:       ${s.transition}\n\n`
      )).join('');

    downloadAsText(`${project?.title?.replace(/[^a-zA-Z0-9]/g, '_')}_Video_Script.txt`, text);
    onNotify?.("Production video script downloaded", "success");
  };

  if (!video.title) {
    return <div className="card text-muted">No video package generated for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-info">Video Package</span>
          <span className="badge badge-neutral">Duration: {video.target_duration}</span>
          <span className="badge badge-neutral">{scenes.length} Production Scenes</span>
        </div>

        <div className="output-actions-group">
          {/* Language Switcher for Voiceover */}
          <div className="segmented-control" style={{ marginRight: '8px' }}>
            <button 
              className={`segment-btn ${activeLang === 'en' ? 'active' : ''}`}
              onClick={() => setActiveLang('en')}
            >
              English Script
            </button>
            <button 
              className={`segment-btn ${activeLang === 'hi' ? 'active' : ''}`}
              onClick={() => setActiveLang('hi')}
            >
              हिंदी Script
            </button>
          </div>

          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setShowStoryboardModal(true)}
            title="Preview visual storyboard"
          >
            <Eye size={14} /> Preview Storyboard
          </button>
          <button 
            className="btn btn-outline btn-sm" 
            onClick={handleCopyScript}
            title="Copy voiceover and cues"
          >
            {copied ? <Check size={14} color="var(--success-600)" /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy Script"}
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleDownloadScript}
            title="Download full script outline"
          >
            <Download size={14} /> Download Script (.txt)
          </button>
        </div>
      </div>

      <div className="output-body">
        <div className="video-package-container">
          {/* Video Metadata Overview Card */}
          <div className="video-overview-card">
            <div className="video-stat-item">
              <span className="video-stat-label">Production Title</span>
              <span className="video-stat-val" style={{ fontSize: '0.95rem' }}>{video.title}</span>
            </div>
            <div className="video-stat-item">
              <span className="video-stat-label">Target Runtime</span>
              <span className="video-stat-val">{video.target_duration}</span>
            </div>
            <div className="video-stat-item">
              <span className="video-stat-label">Target Audience</span>
              <span className="video-stat-val" style={{ fontSize: '0.9rem' }}>{video.target_audience}</span>
            </div>
            <div className="video-stat-item">
              <span className="video-stat-label">Delivery Tone</span>
              <span className="video-stat-val" style={{ color: 'var(--accent-600)' }}>{video.tone}</span>
            </div>
          </div>

          {/* Per-Scene Storyboard Breakdown */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Film size={18} color="var(--accent-500)" />
                Scene-by-Scene Production Breakdown
              </h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Displaying: {activeLang === 'en' ? "English Narration" : "Hindi Narration (हिंदी)"}
              </span>
            </div>

            <div className="storyboard-timeline">
              {scenes.map((scene) => (
                <div key={scene.scene_number} className="scene-card">
                  {/* Left Column: Timing & Transition */}
                  <div className="scene-time-col">
                    <span className="scene-badge">SCENE {scene.scene_number}</span>
                    <span className="scene-duration">
                      <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {scene.time_range}
                    </span>
                    <span className="scene-transition-tag">
                      {scene.transition}
                    </span>
                  </div>

                  {/* Middle Column: Visual Description & On-screen Text */}
                  <div className="scene-visual-col">
                    <span className="scene-col-label">
                      <Tv size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Visual / Camera Direction
                    </span>
                    <p className="scene-visual-desc">
                      {scene.visual_description}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                        Lower Third / On-Screen Graphic:
                      </span>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-600)', background: 'var(--bg-surface-alt)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', marginTop: '2px' }}>
                        {scene.on_screen_text}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Voiceover Script */}
                  <div className="scene-audio-col">
                    <span className="scene-col-label">
                      <Mic size={13} style={{ display: 'inline', marginRight: '4px' }} />
                      Voiceover Narration ({activeLang.toUpperCase()})
                    </span>
                    <p className="scene-script-text">
                      "{activeLang === 'en' ? scene.narration_en : scene.narration_hi}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Storyboard Modal */}
      <Modal 
        isOpen={showStoryboardModal} 
        onClose={() => setShowStoryboardModal(false)}
        title="Interactive Storyboard Flow"
        maxWidth="840px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ padding: '12px 16px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Sequential shot list for video editors, animators, and broadcast teams.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {scenes.map((s) => (
              <div key={s.scene_number} style={{ display: 'flex', gap: '16px', padding: '16px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-surface)' }}>
                <div style={{ width: '120px', height: '80px', background: 'var(--bg-surface-alt)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', flexShrink: 0 }}>
                  <Film size={24} color="var(--accent-500)" />
                  <span style={{ fontSize: '0.7rem', marginTop: '4px', fontFamily: 'monospace' }}>{s.time_range}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Scene {s.scene_number}</span>
                    <span className="badge badge-neutral">{s.transition}</span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    <strong>Visual:</strong> {s.visual_description}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-main)', fontStyle: 'italic', background: 'var(--bg-surface-alt)', padding: '6px 10px', borderRadius: 'var(--radius-sm)' }}>
                    <strong>VO:</strong> "{s.narration_en}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
