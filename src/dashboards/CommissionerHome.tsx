import { useEffect } from 'react';
import type { DashboardProps } from '../types/props';

/**
 * CommissionerHome Dashboard
 *
 * Admin dashboard for community commissioners.
 * Displays admin tools and community management options.
 */
export default function CommissionerHome(props: DashboardProps) {
  const { communityId, user, onNavigate, theme } = props;

  // Expose props globally for testing
  useEffect(() => {
    window.__HELLO_WORLD_PROPS__ = props;
  }, [props]);

  const handleManageUsers = () => {
    onNavigate('/core/user-core/commissioner/users');
  };

  if (!user) {
    return (
      <div data-testid="dashboard-container" data-community-id={communityId}>
        <p>Loading admin...</p>
      </div>
    );
  }

  // Check if user has commissioner role
  const isCommissioner = user.role.name === 'commissioner' || user.role.name === 'admin';

  if (!isCommissioner) {
    return (
      <div
        data-testid="access-denied-page"
        style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#EF4444',
        }}
      >
        <h1>Access Denied</h1>
        <p>You do not have permission to access this page.</p>
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
        Admin Dashboard
      </h1>
      <p style={{ marginBottom: '1rem', color: theme === 'dark' ? '#a0a0a0' : '#666' }}>
        Welcome, Commissioner {user.displayName || user.firstName}
      </p>

      <span
        data-testid="user-role-indicator"
        style={{
          display: 'inline-block',
          padding: '0.25rem 0.75rem',
          backgroundColor: '#7C3AED',
          color: '#ffffff',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
        }}
      >
        {user.role.name}
      </span>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem',
        }}
      >
        <button
          onClick={handleManageUsers}
          style={{
            padding: '1rem',
            backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1rem' }}>Manage Users</h3>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', opacity: 0.7 }}>
            View and manage community members
          </p>
        </button>

        <div
          style={{
            padding: '1rem',
            backgroundColor: theme === 'dark' ? '#374151' : '#F3F4F6',
            borderRadius: '0.5rem',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1rem' }}>Community Stats</h3>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', opacity: 0.7 }}>
            Community ID: {communityId}
          </p>
        </div>
      </div>
    </div>
  );
}
