import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Edit3, 
  CheckCircle2, 
  Hash, 
  MessageSquare, 
  ThumbsUp, 
  Send
} from 'lucide-react';
import { copyToClipboard } from '../../utils/exportUtils';

export default function LinkedInPostView({ data, project, onNotify }) {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postData, setPostData] = useState(data || {});

  const fullText = `${postData.hook}\n\n${postData.body}\n\n` +
    `${postData.key_points?.map(p => `✔️ ${p}`).join('\n')}\n\n` +
    `${postData.hashtags?.join(' ')}`;

  const handleCopy = async () => {
    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopied(true);
      onNotify?.("LinkedIn post content copied to clipboard", "success");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!postData.body) {
    return <div className="card text-muted">No LinkedIn post content generated for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-info">LinkedIn Post</span>
          <span className="badge badge-neutral">Characters: {fullText.length} / 3000</span>
          <span className="badge badge-neutral">Audience: Professional / Stakeholders</span>
        </div>

        <div className="output-actions-group">
          <button 
            className="btn btn-outline btn-sm" 
            onClick={() => setIsEditing(!isEditing)}
            title="Edit post copy"
          >
            <Edit3 size={14} /> {isEditing ? "Save Edits" : "Edit Post"}
          </button>
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleCopy}
            title="Copy post with hashtags"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy Post"}
          </button>
        </div>
      </div>

      <div className="output-body" style={{ background: 'var(--bg-app)' }}>
        {/* Social Card Preview */}
        <div className="social-card">
          <div className="social-author-bar">
            <div className="social-avatar">
              SU
            </div>
            <div className="social-author-info">
              <span className="social-author-name">Department of Public Information & Coordination</span>
              <span className="social-author-title">Official Government Communications Dispatch • 2h • 🌐</span>
            </div>
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className="form-label">Hook Headline</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={postData.hook}
                  onChange={(e) => setPostData({ ...postData, hook: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label">Main Body</label>
                <textarea 
                  className="form-textarea" 
                  value={postData.body}
                  onChange={(e) => setPostData({ ...postData, body: e.target.value })}
                  style={{ minHeight: '160px' }}
                />
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '12px', lineHeight: 1.4 }}>
                {postData.hook}
              </div>

              <div className="social-content-body">
                {postData.body}
              </div>

              {postData.key_points && postData.key_points.length > 0 && (
                <div style={{ margin: '14px 0', padding: '12px 14px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    KEY TAKEAWAYS FOR STAKEHOLDERS:
                  </div>
                  {postData.key_points.map((pt, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', marginBottom: '4px' }}>
                      <CheckCircle2 size={14} color="var(--success-600)" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="social-hashtags">
                {postData.hashtags?.map((tag, idx) => (
                  <span key={idx} className="hashtag-pill">{tag}</span>
                ))}
              </div>
            </>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><ThumbsUp size={14} /> Like</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={14} /> Comment</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Share2 size={14} /> Repost</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Send size={14} /> Send</span>
            </div>
            <div className="char-counter">
              {fullText.length} characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
