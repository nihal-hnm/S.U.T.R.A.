import React from 'react';

export default function StatusBadge({ status = 'Completed', size = 'md' }) {
  const normalized = status.toLowerCase();
  
  let badgeClass = 'badge-neutral';
  if (normalized.includes('critical') || normalized.includes('emergency') || normalized.includes('danger')) {
    badgeClass = 'badge-danger';
  } else if (normalized.includes('complete') || normalized.includes('verified') || normalized.includes('active')) {
    badgeClass = 'badge-success';
  } else if (normalized.includes('progress') || normalized.includes('processing') || normalized.includes('review')) {
    badgeClass = 'badge-accent';
  } else if (normalized.includes('alert') || normalized.includes('urgent') || normalized.includes('warning')) {
    badgeClass = 'badge-warning';
  } else if (normalized.includes('draft') || normalized.includes('archived')) {
    badgeClass = 'badge-neutral';
  }

  const paddingStyle = size === 'sm' ? { padding: '2px 6px', fontSize: '0.68rem' } : {};

  return (
    <span className={`badge ${badgeClass}`} style={paddingStyle}>
      <span 
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          display: 'inline-block'
        }} 
        aria-hidden="true" 
      />
      {status}
    </span>
  );
}
