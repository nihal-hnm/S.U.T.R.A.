import React, { useState } from 'react';
import { 
  Twitter, 
  Copy, 
  Check, 
  MessageCircle, 
  Repeat2, 
  Heart, 
  Share,
  Layers
} from 'lucide-react';
import { copyToClipboard } from '../../utils/exportUtils';

export default function TwitterThreadView({ data, project, onNotify }) {
  const [copiedId, setCopiedId] = useState(null);
  const [allCopied, setAllCopied] = useState(false);
  const thread = data || {};
  const posts = thread.posts || [];

  const handleCopyPost = async (post) => {
    const ok = await copyToClipboard(post.text);
    if (ok) {
      setCopiedId(post.post_number);
      onNotify?.(`Post ${post.post_number}/${posts.length} copied to clipboard`, "success");
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleCopyEntireThread = async () => {
    const allText = posts.map(p => p.text).join('\n\n---\n\n');
    const ok = await copyToClipboard(allText);
    if (ok) {
      setAllCopied(true);
      onNotify?.("Entire thread copied to clipboard", "success");
      setTimeout(() => setAllCopied(false), 2000);
    }
  };

  if (!posts.length) {
    return <div className="card text-muted">No X / Twitter thread generated for this project.</div>;
  }

  return (
    <div className="output-card-wrapper">
      <div className="output-toolbar">
        <div className="output-meta-pills">
          <span className="badge badge-info">X / Twitter Thread</span>
          <span className="badge badge-neutral">{posts.length} Posts in Chain</span>
          <span className="badge badge-neutral">Optimized for 280 Char Limit</span>
        </div>

        <div className="output-actions-group">
          <button 
            className="btn btn-primary btn-sm" 
            onClick={handleCopyEntireThread}
            title="Copy all tweets formatted"
          >
            {allCopied ? <Check size={14} /> : <Layers size={14} />}
            {allCopied ? "Thread Copied" : "Copy Entire Thread"}
          </button>
        </div>
      </div>

      <div className="output-body" style={{ background: 'var(--bg-app)', padding: '24px' }}>
        <div className="thread-container">
          {posts.map((post, idx) => {
            const isLast = idx === posts.length - 1;
            const isCopied = copiedId === post.post_number;

            return (
              <div key={post.post_number} className="thread-item">
                <div className="thread-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--bg-surface-alt)', border: '1px solid var(--accent-500)', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                      𝕏
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                        Public Information Cell
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        @GovInfoOfficial
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="tweet-num-pill">
                      {post.post_number} / {posts.length}
                    </span>
                    <button 
                      className="btn btn-outline btn-sm" 
                      onClick={() => handleCopyPost(post)}
                      style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                      title="Copy this specific tweet"
                    >
                      {isCopied ? <Check size={12} color="var(--success-600)" /> : <Copy size={12} />}
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>

                <div className="tweet-text">
                  {post.text}
                </div>

                <div className="tweet-footer">
                  <div style={{ display: 'flex', gap: '16px', color: 'var(--text-dim)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageCircle size={13} /> 12</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Repeat2 size={13} /> 48</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Heart size={13} /> 194</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Share size={13} /></span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>
                    {post.text.length} / 280
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
