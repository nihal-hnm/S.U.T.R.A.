import React, { useState } from 'react';
import { MessageSquare, Check, Reply, Plus } from 'lucide-react';

const MOCK_COMMENTS = [
  {
    id: 'c1',
    author: 'Dr. Rajeshwar Sharma',
    initials: 'RS',
    text: 'This executive summary captures the key directives well. Approve for distribution.',
    timestamp: '2 minutes ago',
    resolved: false,
  },
  {
    id: 'c2',
    author: 'Priya Menon',
    initials: 'PM',
    text: 'Consider adding a reference to the State Disaster Response Fund allocation in the action matrix.',
    timestamp: '5 minutes ago',
    resolved: false,
  },
  {
    id: 'c3',
    author: 'Vikram Patel',
    initials: 'VP',
    text: 'Helpline numbers verified against the official NDMA database. All correct.',
    timestamp: '12 minutes ago',
    resolved: true,
  },
];

export default function CommentThread({ formatId, initialComments }) {
  const [comments, setComments] = useState(initialComments || MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [showThread, setShowThread] = useState(false);

  const activeCount = comments.filter(c => !c.resolved).length;

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [
      {
        id: `c-${Date.now()}`,
        author: 'Dr. Rajeshwar Sharma',
        initials: 'RS',
        text: newComment.trim(),
        timestamp: 'Just now',
        resolved: false,
      },
      ...prev,
    ]);
    setNewComment('');
  };

  const handleResolve = (id) => {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, resolved: !c.resolved } : c)
    );
  };

  return (
    <div>
      <button
        className="btn btn-outline btn-sm"
        onClick={() => setShowThread(!showThread)}
        style={{ marginTop: '16px' }}
      >
        <MessageSquare size={14} />
        {showThread ? 'Hide' : 'Show'} Comments ({activeCount} active)
      </button>

      {showThread && (
        <div className="comment-thread">
          {/* Add Comment Input */}
          <div className="comment-input-row">
            <div className="comment-avatar">RS</div>
            <input
              type="text"
              className="form-input"
              placeholder="Add a review comment or annotation..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              style={{ fontSize: '0.85rem' }}
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              <Plus size={14} /> Post
            </button>
          </div>

          {/* Comment List */}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className={`comment-item ${comment.resolved ? 'resolved' : ''}`}
            >
              <div className="comment-avatar">{comment.initials}</div>
              <div className="comment-body">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-timestamp">{comment.timestamp}</span>
                  {comment.resolved && (
                    <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>Resolved</span>
                  )}
                </div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-actions">
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => handleResolve(comment.id)}
                    style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                  >
                    <Check size={12} />
                    {comment.resolved ? 'Reopen' : 'Resolve'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
