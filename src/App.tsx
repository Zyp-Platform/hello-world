import { PublicHome, MemberHome, CommissionerHome } from './dashboards';
import type { DashboardProps } from './types/props';

/**
 * Hello World App
 *
 * This is a standalone version for local development.
 * In production, the shell loads individual dashboards via Module Federation.
 */

// Mock props for development
const mockProps: DashboardProps = {
  communityId: 'comm_dev_123',
  user: {
    id: 'user_123',
    firstName: 'Dev',
    lastName: 'User',
    displayName: 'Dev User',
    email: 'dev@example.com',
    role: { name: 'member' },
  },
  onNavigate: (path: string) => {
    console.log('Navigate to:', path);
    window.location.href = path;
  },
  theme: 'light',
};

// Get current route from URL
function getCurrentRoute(): 'public' | 'member' | 'commissioner' {
  const path = window.location.pathname;
  if (path.includes('/commissioner')) return 'commissioner';
  if (path.includes('/member')) return 'member';
  return 'public';
}

export default function App() {
  const route = getCurrentRoute();

  switch (route) {
    case 'commissioner':
      return <CommissionerHome {...mockProps} user={{ ...mockProps.user!, role: { name: 'commissioner' } }} />;
    case 'member':
      return <MemberHome {...mockProps} />;
    default:
      return <PublicHome {...mockProps} user={null} />;
  }
}
