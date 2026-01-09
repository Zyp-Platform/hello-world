import type { DashboardProps } from '../types/props';

/**
 * Test Page
 *
 * A simple test page to demonstrate navigation and component structure.
 */
export default function Test(props: DashboardProps) {
  const { communityId, onNavigate, theme } = props;

  const handleBackHome = () => {
    onNavigate('/core/hello-world/public');
  };

  return (
    <div
      data-testid="test-page-container"
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
        Test Page
      </h1>
      <p style={{ marginBottom: '2rem', color: theme === 'dark' ? '#a0a0a0' : '#666' }}>
        This is a test page to demonstrate navigation between pages.
      </p>

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={handleBackHome}
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
          Back to Home
        </button>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: theme === 'dark' ? '#666' : '#999' }}>
        Community: {communityId}
      </p>
    </div>
  );
}
