import { 
  LayoutDashboard, 
  Sparkles, 
  FileSearch, 
  FileText, 
  History, 
  Settings, 
  UserCheck, 
  ArrowRight,
  X,
  HelpCircle
} from 'lucide-react';

export default function Sidebar({ 
  currentPage, 
  onNavigate, 
  activeProject, 
  isOpen, 
  isCollapsed,
  onClose,
  currentUser,
  onSelectProject,
  allProjects = []
}) {
  // On mobile drawer (when isOpen is true), always render full expanded view
  const effectivelyCollapsed = isCollapsed && !isOpen;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'New Transformation', icon: Sparkles, badge: 'PROMPT' },
    { id: 'analysis', label: 'Source Analysis', icon: FileSearch, disabled: !activeProject, hint: activeProject ? 'Active' : 'No Source' },
    { id: 'outputs', label: 'Generated Outputs', icon: FileText, disabled: !activeProject, badge: activeProject ? `${activeProject.selected_formats?.length || 0}` : null },
    { id: 'history', label: 'Project History', icon: History, count: allProjects.length },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help & Guide', icon: HelpCircle },
    { id: 'profile', label: 'Operator Profile', icon: UserCheck }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onClose} 
          aria-hidden="true" 
        />
      )}

      <aside 
        className={`app-sidebar ${isOpen ? 'open' : ''} ${effectivelyCollapsed ? 'collapsed' : ''}`} 
        aria-label="Main Navigation"
      >
        {/* Brand Header */}
        <div className="sidebar-header">
          <div 
            className="brand-wrapper" 
            onClick={() => {
              onNavigate('dashboard');
              if (onClose) onClose();
            }} 
            style={{ cursor: 'pointer' }}
            title="S.U.T.R.A. Dashboard"
          >
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="6" cy="12" r="2.5" fill="rgba(255,255,255,0.9)"/>
                <circle cx="12" cy="6" r="2.5" fill="#FFB94D"/>
                <circle cx="18" cy="12" r="2.5" fill="#34D399"/>
                <circle cx="12" cy="18" r="2.5" fill="rgba(255,255,255,0.6)"/>
                <path d="M6 12L12 6L18 12L12 18Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="1.5" fill="#FFFFFF"/>
              </svg>
            </div>
            {!effectivelyCollapsed && (
              <div className="brand-text">
                <span className="brand-title">S.U.T.R.A.</span>
                <span className="brand-subtitle">Gov Info Transformation</span>
              </div>
            )}
          </div>

          <button 
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation"
            title="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="sidebar-nav">
          {!effectivelyCollapsed && <div className="nav-section-title">Core Operations</div>}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  if (!item.disabled) {
                    onNavigate(item.id);
                    if (onClose) onClose();
                  }
                }}
                disabled={item.disabled}
                style={{
                  opacity: item.disabled ? 0.45 : 1,
                  cursor: item.disabled ? 'not-allowed' : 'pointer'
                }}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                data-tooltip={item.label}
              >
                <Icon size={18} className="nav-icon" />
                {!effectivelyCollapsed && <span>{item.label}</span>}
                {!effectivelyCollapsed && item.badge && <span className="nav-badge">{item.badge}</span>}
                {!effectivelyCollapsed && item.count !== undefined && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Scenarios Quick Switcher */}
          {!effectivelyCollapsed && (
            <div className="sidebar-scenarios">
              <div className="nav-section-title" style={{ marginTop: '16px' }}>
                <span>Administrative Scenarios</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {allProjects.slice(0, 4).map((p) => {
                  const isCurrent = activeProject?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProject(p);
                        onNavigate('outputs');
                        if (onClose) onClose();
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: isCurrent ? 'var(--bg-active)' : 'transparent',
                        border: isCurrent ? '1px solid var(--border-default)' : '1px solid transparent',
                        color: isCurrent ? 'var(--text-main)' : 'var(--text-muted)',
                        fontSize: '0.75rem',
                        fontWeight: isCurrent ? 500 : 400,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      title={p.title}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '170px' }}>
                        {p.title.split('&')[0].trim()}
                      </span>
                      <ArrowRight size={12} style={{ opacity: isCurrent ? 0.9 : 0.35, color: isCurrent ? 'var(--accent-500)' : 'inherit' }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Footer Profile Meta */}
        <div className="sidebar-footer">
          <div 
            className="user-profile-badge" 
            onClick={() => {
              onNavigate('profile');
              if (onClose) onClose();
            }} 
            role="button"
            tabIndex={0}
            aria-label="View user profile"
            title={currentUser?.name || "Authorized Operator"}
            data-tooltip={currentUser?.name || "Authorized Operator"}
          >
            <div className="user-avatar">
              {currentUser?.name?.charAt(0) || 'O'}
            </div>
            {!effectivelyCollapsed && (
              <div className="user-meta">
                <span className="user-name">{currentUser?.name || "Authorized Operator"}</span>
                <span className="user-role">{currentUser?.designation || "Information Officer"}</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
