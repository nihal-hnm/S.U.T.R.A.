import React, { useState } from 'react';
import { Shield, KeyRound, Mail, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

// Firebase error codes → human-readable messages
const FIREBASE_ERROR_MESSAGES = {
  'auth/user-not-found':     'No account found for this email address.',
  'auth/wrong-password':     'Incorrect password. Please retry or reset below.',
  'auth/invalid-credential': 'Incorrect email or password. Please check and retry.',
  'auth/invalid-email':      'Please enter a valid official email address.',
  'auth/too-many-requests':  'Account temporarily locked due to multiple failed attempts. Try again later.',
  'auth/network-request-failed': 'Network error — check your connection and retry.',
  'auth/popup-closed-by-user':   'Sign-in window was closed. Please try again.',
};

function getAuthErrorMessage(err) {
  return FIREBASE_ERROR_MESSAGES[err?.code] || err?.message || 'Authentication failed. Please retry.';
}

export default function LoginPage({ onLogin, onNotify, signIn, signInWithGoogle }) {
  const [email, setEmail] = useState('operator@sutra.gov.in');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (signIn) {
        // Real Firebase auth path
        const cred = await signIn(email, password);
        const firebaseUser = cred?.user;
        // Build rich profile — Firebase gives us uid/email/displayName,
        // the rest comes from Firestore on next load or falls back to defaults
        await onLogin({
          id:           firebaseUser?.uid || 'usr-operator-01',
          name:         firebaseUser?.displayName || 'Dr. Rajeshwar Sharma',
          email:        firebaseUser?.email || email,
          role:         'Senior Communications Specialist',
          department:   'Department of Administrative Coordination & Public Information',
          designation:  'Authorized Public Information Officer',
          employee_id:  'GOV-IN-7842',
          clearance_level: 'Level 3 - Public Broadcast & Circulars',
        });
        onNotify?.('Authorized session established successfully', 'success');
      } else {
        // Demo fallback (signIn prop not provided)
        await onLogin({
          id: 'usr-operator-01',
          name: 'Dr. Rajeshwar Sharma',
          email: email || 'operator@sutra.gov.in',
          role: 'Senior Communications Specialist',
          department: 'Department of Administrative Coordination & Public Information',
          designation: 'Authorized Public Information Officer',
          employee_id: 'GOV-IN-7842',
          clearance_level: 'Level 3 - Public Broadcast & Circulars',
        });
        onNotify?.('Authorized session established successfully', 'success');
      }
    } catch (err) {
      onNotify?.(getAuthErrorMessage(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      if (signInWithGoogle) {
        const cred = await signInWithGoogle();
        const firebaseUser = cred?.user;
        await onLogin({
          id:          firebaseUser?.uid || 'usr-google-auth',
          name:        firebaseUser?.displayName || 'Rajeshwar Sharma',
          email:       firebaseUser?.email || 'rajeshwar.sharma@gov-sutra.auth',
          role:        'Operator via SSO',
          department:  'Department of Administrative Coordination',
          designation: 'Information Officer',
          employee_id: 'GOV-SSO-912',
        });
        onNotify?.('Authenticated via Institutional SSO', 'success');
      } else {
        // Demo fallback
        await onLogin({
          id: 'usr-google-auth',
          name: 'Rajeshwar Sharma',
          email: 'rajeshwar.sharma@gov-sutra.auth',
          role: 'Operator via SSO',
          department: 'Department of Administrative Coordination',
          designation: 'Information Officer',
          employee_id: 'GOV-SSO-912',
        });
        onNotify?.('Authenticated via Institutional SSO', 'success');
      }
    } catch (err) {
      onNotify?.(getAuthErrorMessage(err), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-app)',
      color: 'var(--text-main)',
      transition: 'background var(--transition-fast)',
      position: 'relative'
    }}>
      
      {/* Animated Background Elements */}
      <div className="login-bg">
        <div className="login-grid-pattern"></div>
        <div className="login-gradient-orb login-gradient-orb-1"></div>
        <div className="login-gradient-orb login-gradient-orb-2"></div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="login-card">
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="login-logo-wrap" style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #7C5CFC 0%, #5B3FBF 100%)',
              border: 'none',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(124, 92, 252, 0.35), 0 4px 16px rgba(124, 92, 252, 0.2)'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="6" cy="12" r="2.5" fill="rgba(255,255,255,0.9)"/>
                <circle cx="12" cy="6" r="2.5" fill="#FFB94D"/>
                <circle cx="18" cy="12" r="2.5" fill="#34D399"/>
                <circle cx="12" cy="18" r="2.5" fill="rgba(255,255,255,0.6)"/>
                <path d="M6 12L12 6L18 12L12 18Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="1.5" fill="#FFFFFF"/>
              </svg>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.18em', margin: 0, color: 'var(--text-main)', textTransform: 'uppercase' }}>
              S.U.T.R.A.
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-400)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
              Government Information Transformation System
            </p>
            
            <div className="login-system-status">
              <div className="status-pulse"></div>
              All Systems Operational
            </div>
          </div>

          {/* Institutional Trust Notice */}
          <div style={{
            background: 'var(--accent-50)',
            border: '1px solid var(--accent-100)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.785rem',
            color: 'var(--accent-300)',
            backdropFilter: 'blur(8px)'
          }}>
            <Shield size={18} style={{ flexShrink: 0, color: 'var(--accent-400)' }} />
            <div>
              <strong>Authorized Access Only.</strong> Activity is authenticated and monitored under administrative audit guidelines.
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="form-label" style={{ color: 'var(--text-main)' }}>
                <span>Official Email / Operator ID</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    paddingLeft: '38px',
                    background: 'var(--bg-input)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-main)'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ color: 'var(--text-main)', margin: 0 }}>Security Password</label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); onNotify?.("Password reset protocol dispatched to registered official mobile number", "info"); }}
                  style={{ fontSize: '0.75rem', color: 'var(--accent-600)', textDecoration: 'none' }}
                >
                  Forgot Password?
                </a>
              </div>
              <div style={{ position: 'relative' }}>
                <KeyRound size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    paddingLeft: '38px',
                    background: 'var(--bg-input)',
                    borderColor: 'var(--border-default)',
                    color: 'var(--text-main)'
                  }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
              style={{
                marginTop: '8px',
                padding: '12px',
                fontSize: '0.95rem'
              }}
            >
              {loading ? "Authenticating Session..." : "Secure Operator Login"} <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={handleGoogleLogin}
              disabled={loading}
              style={{
                borderColor: 'var(--border-default)',
                color: 'var(--text-main)'
              }}
            >
              Sign in with Government SSO
            </button>
          </form>

          {/* What is S.U.T.R.A. Expandable Section */}
          <div className="login-expand-section">
            <button 
              type="button"
              className="login-expand-trigger"
              onClick={() => setShowInfo(!showInfo)}
            >
              <span>What is S.U.T.R.A.?</span>
              {showInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {showInfo && (
              <div className="login-expand-content">
                S.U.T.R.A. (Source → Understanding → Transformation → Response → Artifact) is an AI-powered institutional system designed to instantly transform official directives, disaster alerts, and policy circulars into audience-calibrated outputs across 7 communication channels with zero informational drift.
              </div>
            )}
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.65rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
            This is not an official government website. S.U.T.R.A. is a prototype communication transformation tool for authorized operators only.
          </div>
        </div>
      </div>
    </div>
  );
}
