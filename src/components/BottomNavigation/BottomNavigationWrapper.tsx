'use client';

import { useAuth } from '@/lib/auth/authContext';
import BottomNavigation from './BottomNavigation';
import {useEffect, useState} from "react";

type Props = {
  isAuthenticated: boolean;
}
export default function BottomNavigationWrapper({ isAuthenticated: serverAuth }: Props) {
  const { isAuthenticated: clientAuth } = useAuth();
  const [mounted, setMounted] = useState(false);

  const [isOpenSwitcher, setIsOpenSwitcher] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthenticated = mounted ? clientAuth : serverAuth;

  if (!isAuthenticated) return null;

  return <BottomNavigation />;
}
