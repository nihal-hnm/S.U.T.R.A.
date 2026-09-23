import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Building2, 
  Mail, 
  Award, 
  Clock, 
  FileText, 
  Layers, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

export default function ProfilePage({ currentUser, projects = [], onNavigate }) {
  const totalOutputs = projects.reduce((acc, p) => acc + (p.selected_formats?.length || 0), 0);

  return (
    <div className="page-container" style={{ maxWidth: '960px' }}>
      <div className="page-header">
        <div className="page-title-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-success">Authorized Personnel</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Digital Signature Verified</span>
          </div>
          <h1 className="page-title">Operator Profile</h1>
          <p className="page-subtitle">
            Authenticated operator identity, security clearance credentials, and communication activity trail.
          </p>
        </div>

        <button 
          className="btn btn-outline btn-sm"
          onClick={() => onNavigate('settings')}
        >
          Edit Profile in Settings
        </button>
      </div>

      {/* Operator Identity Hero Card */}
      <div className="card" style={{ marginBottom: '24px', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface-alt)',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            fontWeight: 800,
            border: '2px solid var(--accent-500)',
            boxShadow: 'var(--shadow-md)'
          }}>
            {currentUser?.name?.charAt(0) || 'O'}
          </div>

          <div style={{ flex: 1, minWidth: '240px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                {currentUser?.name || "Dr. Rajeshwar Sharma"}
              </h2>
              <span className="badge badge-success">Verified Operator</span>
            </div>

            <div style={{ fontSize: '0.9rem', color: 'var(--accent-600)', fontWeight: 600, marginBottom: '6px' }}>
              {currentUser?.designation || "Authorized Public Information Officer"}
            </div>

            <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Building2 size={14} /> {currentUser?.department || "Department of Administrative Coordination"}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mail size={14} /> {currentUser?.email || "operator@sutra.gov.in"}
              </span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Employee ID</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', marginTop: '2px' }}>
              {currentUser?.employee_id || "GOV-IN-7842"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Clearance Tier</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-600)', marginTop: '2px' }}>
              {currentUser?.clearance_level || "Level 3 - Public Broadcast"}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>Current Status</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--success-700)', marginTop: '2px' }}>
              Active Authorized Session
            </div>
          </div>
        </div>
      </div>

      {/* Operator Metrics & Permissions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Metric Summary */}
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '14px' }}>
            Activity Overview
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Projects Ingested & Analyzed</span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>{projects.length}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Artifacts Derived & Verified</span>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>{totalOutputs}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Message Drift Rate</span>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--success-600)' }}>0.0% (Zero Drift)</span>
            </div>
          </div>
        </div>

        {/* Delegated Clearances */}
        <div className="card">
          <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '14px' }}>
            <ShieldCheck size={18} color="var(--green-500)" />
            Delegated Administrative Authorizations
          </h3>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            {[
              "Executive summary sign-off authority",
              "Emergency flood & disaster advisory issuance",
              "Social media channel dispatch (LinkedIn & X)",
              "Multi-lingual synthesis verification (Hindi/English)",
              "Access to restricted administrative audit logs"
            ].map((perm, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} color="var(--success-600)" />
                <span style={{ color: 'var(--text-main)' }}>{perm}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Operator Transformation Audit Log */}
      <div className="card">
        <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '14px' }}>
          <Clock size={18} color="var(--accent-500)" />
          Recent Operator Activity Audit Trail
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {projects.slice(0, 4).map((p, idx) => (
            <div 
              key={p.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-surface-alt)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.825rem'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                  Generated {p.selected_formats?.length || 0} artifacts for: {p.title}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  Audience: {p.config?.target_audience} • Language: {p.config?.language}
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {formatDateTime(p.created_at)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
