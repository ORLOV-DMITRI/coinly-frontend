'use client';

import { useAuth } from '@/lib/auth/authContext';
import BottomNavigation from './BottomNavigation';

export default function BottomNavigationWrapper() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return <BottomNavigation />;
}
