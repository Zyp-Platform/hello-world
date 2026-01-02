import { useEffect } from 'react';
import type { DashboardProps } from '../types/props';

/**
 * MemberHome Dashboard
 *
 * Personalized dashboard for authenticated members.
 * Displays greeting with user name and navigation options.
 */
export default function MemberHome(props: DashboardProps) {
  const { communityId, user, onNavigate, theme } = props;

  // Expose props globally for testing
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);

  const handleGoToAccount = () => {
    onNavigate('/core/user-core/member/account');
  };

  if (!user) {
    return (
      <div data-testid="dashboard-container" data-community-id={communityId}>
        <p>Loading user...</p>
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
        Hello, {user.displayName || user.firstName}!
      </h1>
      <p style={{ marginBottom: '1rem', color: theme === 'dark' ? '#a0a0a0' : '#666' }}>
        Welcome back to your dashboard.
      </p>

      <span
        data-testid="user-role-indicator"
        style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          backgroundColor: theme === 'dark' ? '#374151' : '#E5E7EB',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
        }}
      >
        {user.role.name}
      </span>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={handleGoToAccount}
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
          Go to Account
        </button>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: theme === 'dark' ? '#666' : '#999' }}>
        Community: {communityId}
      </p>
    </div>
  );
}
