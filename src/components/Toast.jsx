import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';

        return (
          <div key={t.id} className={`toast ${isSuccess ? 'success' : isError ? 'error' : ''}`}>
            {isSuccess ? (
              <CheckCircle2 size={18} color="var(--success-500)" />
            ) : isError ? (
              <AlertTriangle size={18} color="var(--danger-500)" />
            ) : (
              <Info size={18} color="var(--accent-500)" />
            )}
            <span style={{ flex: 1 }}>{t.message}</span>
            <button 
              onClick={() => onDismiss(t.id)} 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '2px' }}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
