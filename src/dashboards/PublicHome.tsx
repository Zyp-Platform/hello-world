import { useEffect, useState } from 'react';
import type { DashboardProps } from '../types/props';
import Calculator from '../pages/Calculator';

/**
 * PublicHome Dashboard
 *
 * Landing page for unauthenticated users. Displays welcome message
 * and sign-in CTA.
 */
export default function PublicHome(props: DashboardProps) {
  const { communityId, onNavigate, theme } = props;
  const [showCalculator, setShowCalculator] = useState(false);

  // Expose props globally for testing
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);

  const handleSignIn = () => {
    onNavigate('/core/user-core/public/auth/login');
  };

  if (showCalculator) {
    return (
      <div>
        <Calculator {...props} />
        <div
          style={{
            padding: '1rem',
            textAlign: 'center',
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
          }}
        >
          <button
            onClick={() => setShowCalculator(false)}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#6B7280',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="dashboard-container"
      data-community-id={communityId}
      data-theme={theme}
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#1a1a1a',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Welcome to the new zyp platform!
      </h1>
      <p style={{ marginBottom: '2rem', color: theme === 'dark' ? '#a0a0a0' : '#666' }}>
        A minimal SPA for Shell-V1 prototype validation.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={handleSignIn}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#3B82F6',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => setShowCalculator(true)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#10B981',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Open Calculator
        </button>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: theme === 'dark' ? '#666' : '#999' }}>
        Community: {communityId}
      </p>
    </div>
  );
}
