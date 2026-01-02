/**
 * Dashboard Props - Contract between Shell and SPA
 *
 * These props are injected by the shell at runtime via Module Federation.
 */

export interface DashboardUser {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email?: string;
  avatarUrl?: string;
  role: { name: string };
}

export interface DashboardProps {
  /** Current community/tenant ID */
  communityId: string;
  /** Authenticated user or null for public pages */
  user: DashboardUser | null;
  /** Shell navigation callback */
  onNavigate: (path: string) => void;
  /** Current theme mode */
  theme: 'light' | 'dark';
}

/**
 * Expose props globally for testing and debugging
 */
declare global {
  interface Window {
    __HELLO_WORLD_PROPS__?: DashboardProps;
  }
}
