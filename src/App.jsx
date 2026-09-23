import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/Toast';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTransformationPage from './pages/CreateTransformationPage';
import SourceAnalysisPage from './pages/SourceAnalysisPage';
import GeneratedOutputsPage from './pages/GeneratedOutputsPage';
import ProjectHistoryPage from './pages/ProjectHistoryPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import HelpCenterPage from './pages/HelpCenterPage';
import OnboardingOverlay from './components/OnboardingOverlay';
import BottomNav from './components/BottomNav';

// Services
import { 
  getStoredProjects, 
  saveStoredProjects, 
  getStoredUser, 
  saveStoredUser,
  getStoredSettings,
  saveStoredSettings
} from './services/store';

export default function App() {
  // State Initialization
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for seamless evaluation
  const [settings, setSettings] = useState(getStoredSettings);
  const [projects, setProjects] = useState(getStoredProjects);
  const [activeProject, setActiveProject] = useState(() => projects[0] || null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [pageParams, setPageParams] = useState({});
  const [theme, setTheme] = useState(settings?.theme || 'dark');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('sutra_onboarded');
  });

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarMobileOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  // Synchronize theme attribute to DOM root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast Notification Helper
  const showNotification = (message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Theme Toggle Handler
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    const updated = { ...settings, theme: newTheme };
    setSettings(updated);
    saveStoredSettings(updated);
    showNotification(`Switched to ${newTheme === 'dark' ? 'Rich Zinc Dark' : 'Institutional Light'} Theme`, "info");
  };

  // Navigation Controller
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Handlers
  const handleLogin = (user) => {
    setCurrentUser(user);
    saveStoredUser(user);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    showNotification("Operator session logged out safely", "info");
  };

  // Project Transformation Completion
  const handleTransformationComplete = (newProject) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
    setActiveProject(newProject);
    setCurrentPage('outputs');
  };

  // Project Selection Handler
  const handleSelectProject = (proj) => {
    setActiveProject(proj);
  };

  // Project Delete Handler
  const handleDeleteProject = (projectId) => {
    const updated = projects.filter(p => p.id !== projectId);
    setProjects(updated);
    saveStoredProjects(updated);
    if (activeProject?.id === projectId) {
      setActiveProject(updated[0] || null);
    }
    showNotification("Project record removed from local archive", "info");
  };

  // User Settings Update
  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  const handleUpdateUser = (newUser) => {
    setCurrentUser(newUser);
    saveStoredUser(newUser);
  };

  // If not authenticated or on login page, display Login view
  if (!isAuthenticated || currentPage === 'login') {
    return (
      <>
        <LoginPage onLogin={handleLogin} onNotify={showNotification} />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  return (
    <div className="app-shell-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <div className={`app-shell ${sidebarCollapsed ? 'sidebar-is-collapsed' : ''}`}>
        {/* Persistent Desktop & Responsive Mobile Sidebar */}
        <Sidebar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          activeProject={activeProject}
          isOpen={sidebarMobileOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarMobileOpen(false)}
          currentUser={currentUser}
          onSelectProject={handleSelectProject}
          allProjects={projects}
        />

        {/* Main Content Viewport */}
        <div className="main-wrapper">
          <Navbar 
            currentUser={currentUser}
            theme={theme}
            onToggleTheme={toggleTheme}
            onNavigate={handleNavigate}
            onToggleSidebar={toggleSidebar}
            isCollapsed={sidebarCollapsed}
            onLogout={handleLogout}
          />

          <main id="main-content" role="main" style={{ flex: 1 }}>
            {currentPage === 'dashboard' && (
              <DashboardPage 
                projects={projects}
                onNavigate={handleNavigate}
                onSelectProject={handleSelectProject}
                currentUser={currentUser}
              />
            )}

            {currentPage === 'create' && (
              <CreateTransformationPage 
                onTransformationComplete={handleTransformationComplete}
                onNotify={showNotification}
              />
            )}

            {currentPage === 'analysis' && (
              <SourceAnalysisPage 
                project={activeProject}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'outputs' && (
              <GeneratedOutputsPage 
                project={activeProject}
                onNavigate={handleNavigate}
                onNotify={showNotification}
              />
            )}

            {currentPage === 'history' && (
              <ProjectHistoryPage 
                projects={projects}
                onSelectProject={handleSelectProject}
                onNavigate={handleNavigate}
                onDeleteProject={handleDeleteProject}
                initialSearch={pageParams.searchQuery || ''}
              />
            )}

            {currentPage === 'project-details' && (
              <ProjectDetailsPage 
                project={projects.find(p => p.id === pageParams.projectId) || activeProject}
                onNavigate={handleNavigate}
                onNotify={showNotification}
              />
            )}

            {currentPage === 'settings' && (
              <SettingsPage 
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
                theme={theme}
                onToggleTheme={toggleTheme}
                onNotify={showNotification}
              />
            )}

            {currentPage === 'profile' && (
              <ProfilePage 
                currentUser={currentUser}
                projects={projects}
                onNavigate={handleNavigate}
              />
            )}

            {currentPage === 'help' && (
              <HelpCenterPage 
                onNavigate={handleNavigate}
              />
            )}
          </main>
        </div>
      </div>

      {/* Global Notification Toasts */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Mobile Bottom Navigation (visible < 768px) */}
      <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

      {/* First-run Onboarding Overlay */}
      {showOnboarding && (
        <OnboardingOverlay onComplete={() => setShowOnboarding(false)} />
      )}
    </div>
  );
}
