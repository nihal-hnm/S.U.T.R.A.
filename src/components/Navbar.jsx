import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  User, 
  ShieldCheck, 
  Menu, 
  LogOut, 
  Settings as SettingsIcon,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  theme, 
  onToggleTheme, 
  onNavigate, 
  onToggleSidebar,
  isCollapsed,
  onLogout 
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    { id: 1, title: "District Flood Advisory generated", time: "10 mins ago", type: "success" },
    { id: 2, title: "New ABDM compliance template updated", time: "2 hours ago", type: "info" },
    { id: 3, title: "Security audit log verified for Session #894", time: "Yesterday", type: "neutral" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onNavigate('history', { searchQuery: searchTerm.trim() });
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-brand-wrapper">
          <button 
            className="sidebar-toggle-btn" 
            onClick={onToggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar navigation" : "Collapse sidebar navigation"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={18} />
          </button>

          <div 
            className="topbar-brand"
            onClick={() => onNavigate('dashboard')}
            role="button"
            tabIndex={0}
            aria-label="S.U.T.R.A. Home"
          >
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="6" cy="12" r="2.5" fill="var(--text-main)"/>
                <circle cx="12" cy="6" r="2.5" fill="var(--accent-500)"/>
                <circle cx="18" cy="12" r="2.5" fill="var(--green-500)"/>
                <circle cx="12" cy="18" r="2.5" fill="var(--accent-600)"/>
                <path d="M6 12L12 6L18 12L12 18Z" stroke="var(--border-strong)" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="1.5" fill="var(--text-main)"/>
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">S.U.T.R.A.</span>
              <span className="brand-subtitle">Gov Info Transformation</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="search-bar">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            placeholder="Search projects, circulars, advisories, outputs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects and communications"
          />
        </form>
      </div>

      <div className="topbar-right">
        {/* Theme Toggle */}
        <button
          className="topbar-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? "Switch to Institutional Light Mode" : "Switch to Institutional Dark Slate Mode"}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            className="topbar-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            title="System notifications"
          >
            <Bell size={18} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '12px',
                zIndex: 100
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>System Notifications</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>3 Unread</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    style={{ 
                      padding: '8px 10px', 
                      background: 'var(--bg-surface-alt)', 
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      borderLeft: '3px solid var(--accent-500)'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{n.title}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '2px' }}>{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Trigger */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-default)',
              padding: '4px 10px 4px 6px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              color: 'var(--text-main)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'}
            aria-label="User profile options"
          >
            <div 
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-100)',
                border: '1px solid var(--accent-200)',
                color: 'var(--accent-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '0.75rem'
              }}
            >
              {currentUser?.name?.charAt(0) || 'O'}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.775rem', fontWeight: 700, lineHeight: 1.1 }}>
                {currentUser?.name?.split(' ')[0] || 'Operator'}
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>Authorized</span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-dim)' }} />
          </button>

          {showProfileMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '220px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 100
              }}
            >
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>{currentUser?.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{currentUser?.email}</div>
              </div>
              <button 
                className="nav-link" 
                style={{ width: '100%', color: 'var(--text-main)' }}
                onClick={() => { setShowProfileMenu(false); onNavigate('profile'); }}
              >
                <User size={16} /> Operator Profile
              </button>
              <button 
                className="nav-link" 
                style={{ width: '100%', color: 'var(--text-main)' }}
                onClick={() => { setShowProfileMenu(false); onNavigate('settings'); }}
              >
                <SettingsIcon size={16} /> System Settings
              </button>
              <div style={{ borderTop: '1px solid var(--border-light)', margin: '4px 0' }} />
              <button 
                className="nav-link" 
                style={{ width: '100%', color: 'var(--danger-600)' }}
                onClick={() => { setShowProfileMenu(false); onLogout(); }}
              >
                <LogOut size={16} /> Exit Session
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
