import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Sliders, 
  Shield, 
  Moon, 
  Sun, 
  Laptop, 
  Save, 
  RotateCcw,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { resetDemoData } from '../services/store';

export default function SettingsPage({ 
  settings, 
  onUpdateSettings, 
  currentUser, 
  onUpdateUser, 
  theme, 
  onToggleTheme, 
  onNotify 
}) {
  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'preferences' | 'security' | 'interface'
  
  // Account Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [designation, setDesignation] = useState(currentUser?.designation || '');

  // Preferences Form State
  const [defaultLanguage, setDefaultLanguage] = useState(settings?.default_language || 'English');
  const [defaultTone, setDefaultTone] = useState(settings?.default_tone || 'Professional');
  const [defaultAudience, setDefaultAudience] = useState(settings?.default_audience || 'General Public');
  const [autoSave, setAutoSave] = useState(settings?.auto_save_drafts ?? true);

  const handleSaveAccount = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...currentUser,
      name,
      email,
      department,
      designation
    });
    onNotify?.("Account profile details updated successfully", "success");
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    onUpdateSettings({
      ...settings,
      default_language: defaultLanguage,
      default_tone: defaultTone,
      default_audience: defaultAudience,
      auto_save_drafts: autoSave
    });
    onNotify?.("System transformation preferences saved", "success");
  };

  const handleResetData = () => {
    if (window.confirm("Reset all project transformations and preferences to initial sample state?")) {
      resetDemoData();
      window.location.reload();
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '960px' }}>
      <div className="page-header">
        <div className="page-title-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-neutral">Administration</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Configuration & Credentials</span>
          </div>
          <h1 className="page-title">System Settings</h1>
          <p className="page-subtitle">
            Manage operator profile, transformation defaults, institutional security, and display preferences.
          </p>
        </div>

        <button 
          className="btn btn-outline btn-sm" 
          onClick={handleResetData}
          title="Restore standard demonstration data"
        >
          <RotateCcw size={14} /> Reset Demo Data
        </button>
      </div>

      {/* Tabs */}
      <div className="tabs-nav">
        <button 
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          <User size={16} /> Account & Organization
        </button>
        <button 
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <Sliders size={16} /> Transformation Defaults
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={16} /> Security & Sessions
        </button>
        <button 
          className={`tab-btn ${activeTab === 'interface' ? 'active' : ''}`}
          onClick={() => setActiveTab('interface')}
        >
          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />} Display & Theme
        </button>
      </div>

      {/* Tab 1: Account */}
      {activeTab === 'account' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Operator Account Information</h2>
              <p className="card-desc">Institutional credentials tied to official circular releases and audit trails.</p>
            </div>
          </div>

          <form onSubmit={handleSaveAccount}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Full Name & Salutation</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Official Gov Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Department / Agency</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Designation / Role</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Account Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Preferences */}
      {activeTab === 'preferences' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Default Transformation Parameters</h2>
              <p className="card-desc">Initial settings applied when creating new communications from source files.</p>
            </div>
          </div>

          <form onSubmit={handleSavePreferences}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Default Language</label>
                <select 
                  className="form-select"
                  value={defaultLanguage}
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
                <span className="form-hint">Regional Indian languages expandable in future release</span>
              </div>

              <div className="form-group">
                <label className="form-label">Default Tone</label>
                <select 
                  className="form-select"
                  value={defaultTone}
                  onChange={(e) => setDefaultTone(e.target.value)}
                >
                  <option value="Formal">Formal</option>
                  <option value="Professional">Professional</option>
                  <option value="Neutral">Neutral</option>
                  <option value="Informative">Informative</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Default Target Audience</label>
                <select 
                  className="form-select"
                  value={defaultAudience}
                  onChange={(e) => setDefaultAudience(e.target.value)}
                >
                  <option value="General Public">General Public</option>
                  <option value="Government Officials">Government Officials</option>
                  <option value="Senior Officials">Senior Officials</option>
                  <option value="Media & Press">Media & Press</option>
                  <option value="Technical Teams">Technical Teams</option>
                </select>
              </div>

              <div className="form-group" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.875rem' }}>
                  <input 
                    type="checkbox" 
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span>Automatically persist draft transformations to local cache</span>
                </label>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save Default Preferences
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Security & Sessions */}
      {activeTab === 'security' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card">
            <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>
              <Shield size={18} color="var(--success-600)" />
              Two-Factor Authentication & Access Control
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-surface-alt)', borderRadius: 'var(--radius-md)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                  Hardware Token / Mobile OTP Authenticator
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Active • Required for official circular publishing permissions
                </div>
              </div>
              <span className="badge badge-success">Enforced</span>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title" style={{ fontSize: '1rem', marginBottom: '12px' }}>
              Active Authorized Sessions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Chrome 128 on Windows 11 (Current Workspace)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    IP: 10.42.18.99 • NIC Cyber Node New Delhi • Active Now
                  </div>
                </div>
                <span className="badge badge-success">Current Session</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>Safari on iPadOS (Mobile Inspection Terminal)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    IP: 10.42.19.04 • Regional Office • Last active 4 hours ago
                  </div>
                </div>
                <button 
                  className="btn btn-outline btn-sm"
                  onClick={() => onNotify?.("Remote session terminated", "info")}
                  style={{ color: 'var(--danger-600)' }}
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Display & Theme */}
      {activeTab === 'interface' && (
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Interface Theme & Accessibility</h2>
              <p className="card-desc">Calibrated institutional styling adhering to high-contrast accessibility standards.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {/* Light Theme Card */}
            <div 
              onClick={() => { if (theme !== 'light') onToggleTheme(); }}
              style={{
                border: theme === 'light' ? '2px solid var(--accent-500)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                cursor: 'pointer',
                background: '#FFFFFF',
                color: '#0F172A',
                boxShadow: theme === 'light' ? 'var(--shadow-md)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Sun size={24} color="var(--accent-500)" />
                {theme === 'light' && <span className="badge badge-accent">Active</span>}
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
                Crisp Pure White Theme
              </div>
              <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                Pure white surfaces, high-contrast dark typography, and Royal Azure highlights. No dark major containers.
              </p>
            </div>

            {/* Pure Black Theme Card */}
            <div 
              onClick={() => { if (theme !== 'dark') onToggleTheme(); }}
              style={{
                border: theme === 'dark' ? '2px solid var(--accent-500)' : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                cursor: 'pointer',
                background: '#09090B',
                color: '#FFFFFF',
                boxShadow: theme === 'dark' ? 'var(--shadow-md)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <Moon size={24} color="var(--accent-500)" />
                {theme === 'dark' && <span className="badge badge-accent">Active</span>}
              </div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '4px' }}>
                Pure Black Theme
              </div>
              <p style={{ fontSize: '0.8rem', color: '#A3A3A3', lineHeight: 1.4 }}>
                Deep pure black palette with Royal Azure and emerald green highlights for high-authority administrative workflows.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
