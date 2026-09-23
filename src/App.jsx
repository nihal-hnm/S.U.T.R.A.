import React, { useState, useEffect, useCallback } from 'react';
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

// Auth context & hooks
import { AuthProvider, useAuth } from './context/AuthContext';
import { useProjects } from './hooks/useProjects';

// Services
import {
  getStoredUser,
  saveStoredUser,
  getStoredProjects,
  saveStoredProjects,
  getStoredSettings,
  saveStoredSettings,
} from './services/store';

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Inner app â€” must be inside AuthProvider to use useAuth
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function AppInner() {
  const { user, loading: authLoading, signIn, signInWithGoogle, signOut, isFirebaseConfigured } = useAuth();

  // â”€â”€ Session state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // currentUser merges Firebase user (uid, email) with the richer profile
  // stored in Firestore / localStorage (name, department, role, etc.)
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const [settings, setSettings]       = useState(getStoredSettings);
  const [activeProject, setActiveProject] = useState(null);
  const [currentPage, setCurrentPage]     = useState('dashboard');
  const [pageParams, setPageParams]       = useState({});
  const [theme, setTheme]                 = useState(() => getStoredSettings()?.theme || 'dark');
  const [sidebarCollapsed, setSidebarCollapsed]   = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [toasts, setToasts]   = useState([]);
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('sutra_onboarded')
  );

  // â”€â”€ Projects â€” live Firestore or localStorage fallback â”€â”€â”€â”€â”€â”€â”€â”€
  const uid = user?.uid ?? null;
  const { projects: firestoreProjects, loading: projectsLoading } = useProjects(uid);

  // Merge: Firestore projects when available, else stored list
  const [localProjects, setLocalProjects] = useState(getStoredProjects);
  const projects = isFirebaseConfigured && uid && !projectsLoading
    ? firestoreProjects
    : localProjects;

  // Keep activeProject in sync when projects list changes
  useEffect(() => {
    if (!activeProject && projects.length > 0) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  // â”€â”€ Sync theme to DOM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // â”€â”€ Sync Firebase user â†’ currentUser profile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  useEffect(() => {
    if (user && isFirebaseConfigured) {
      // Merge Firebase auth user into the richer profile object
      setCurrentUser((prev) => ({
        ...prev,
        id: user.uid,
        email: user.email || prev?.email,
        name: user.displayName || prev?.name,
      }));
    }
  }, [user, isFirebaseConfigured]);

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarMobileOpen(prev => !prev);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  // â”€â”€ Toast Notification Helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const showNotification = useCallback((message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  // â”€â”€ Theme Toggle â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    const updated = { ...settings, theme: newTheme };
    setSettings(updated);
    saveStoredSettings(updated);
    showNotification(
      `Switched to ${newTheme === 'dark' ? 'Rich Zinc Dark' : 'Institutional Light'} Theme`,
      'info'
    );
  };

  // â”€â”€ Navigation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // â”€â”€ Auth Handlers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  /**
   * Called by LoginPage after successful credential entry.
   * In demo mode, profileData contains the hardcoded mock user.
   * In Firebase mode, profileData is ignored (auth state comes via onAuthStateChanged).
   */
  const handleLogin = useCallback(async (profileData) => {
    // Persist the richer profile object (name, role, department, etc.)
    if (profileData) {
      setCurrentUser(profileData);
      saveStoredUser(profileData);
    }
    setCurrentPage('dashboard');
  }, []);

  const handleLogout = useCallback(async () => {
    await signOut();
    setCurrentPage('login');
    setActiveProject(null);
    showNotification('Operator session logged out safely', 'info');
  }, [signOut, showNotification]);

  // â”€â”€ Transformation Complete â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleTransformationComplete = (newProject) => {
    if (!isFirebaseConfigured) {
      // Demo mode: update local state + localStorage
      const updated = [newProject, ...localProjects];
      setLocalProjects(updated);
      saveStoredProjects(updated);
    }
    // In Firebase mode, the Firestore onSnapshot listener auto-refreshes the list
    setActiveProject(newProject);
    setCurrentPage('outputs');
  };

  const handleSelectProject = (proj) => setActiveProject(proj);

  const handleDeleteProject = (projectId) => {
    if (!isFirebaseConfigured) {
      const updated = localProjects.filter(p => p.id !== projectId);
      setLocalProjects(updated);
      saveStoredProjects(updated);
    }
    if (activeProject?.id === projectId) setActiveProject(null);
    showNotification('Project record removed from archive', 'info');
  };

  const handleUpdateSettings = (newSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  const handleUpdateUser = (newUser) => {
    setCurrentUser(newUser);
    saveStoredUser(newUser);
  };

  // â”€â”€ Auth loading screen (prevents flash of login on cold load) â”€
  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-app)',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{
          width: '40px', height: '40px',
          border: '3px solid var(--border-default)',
          borderTopColor: 'var(--accent-500)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
          Verifying sessionâ€¦
        </span>
      </div>
    );
  }

  // â”€â”€ Route guard: unauthenticated â†’ Login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // In demo mode (Firebase not configured), user is always null from Firebase
  // but we still allow access if currentPage is not 'login' by letting
  // LoginPage's demo flow set currentPage to 'dashboard' via handleLogin.
  const isAuthenticated = isFirebaseConfigured ? !!user : currentPage !== 'login';

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          onNotify={showNotification}
          signIn={signIn}
          signInWithGoogle={signInWithGoogle}
        />
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
              <HelpCenterPage onNavigate={handleNavigate} />
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Root export â€” wraps AppInner in AuthProvider
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

