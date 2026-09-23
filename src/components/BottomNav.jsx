import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  History, 
  UserCheck 
} from 'lucide-react';

/**
 * Mobile-only bottom navigation bar.
 * Renders 5 primary navigation destinations at < 768px.
 * Hidden on desktop where the sidebar is persistent.
 */
export default function BottomNav({ currentPage, onNavigate }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create', icon: Sparkles },
    { id: 'outputs', label: 'Outputs', icon: FileText },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: UserCheck }
  ];

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Mobile navigation">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.id;
        return (
          <button
            key={item.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={item.label}
          >
            <Icon size={20} className="bottom-nav-icon" />
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
