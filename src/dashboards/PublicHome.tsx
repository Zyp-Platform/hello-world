import { useEffect } from 'react';
import type { DashboardProps } from '../types/props';

/**
 * PublicHome Dashboard
 *
 * Landing page for unauthenticated users. Displays welcome message
 * and sign-in CTA.
 */
export default function PublicHome(props: DashboardProps) {
  const { communityId, onNavigate, theme } = props;

  // Expose props globally for testing
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);

  const handleSignIn = () => {
    onNavigate('/core/user-core/public/auth/login');
  };

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
        gregs world!
      </h1>
      <p style={{ marginBottom: '2rem', color: theme === 'dark' ? '#a0a0a0' : '#666' }}>
        A minimal SPA for Shell-V1 prototype validation.
      </p>
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
        }}
      >
        Sign In
      </button>
      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: theme === 'dark' ? '#666' : '#999' }}>
        Community: {communityId}
      </p>
    </div>
  );
}
