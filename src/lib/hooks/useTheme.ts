'use client';

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const THEME_KEY = 'theme';
const THEME_CLASS_MAP: Record<Exclude<Theme, 'system'>, string> = {
  light: 'light-theme',
  dark: 'dark-theme',
};

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {

    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(THEME_KEY) as Theme) || 'system';

  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';

    const storedTheme = localStorage.getItem(THEME_KEY) as Theme;

    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    const root = document.documentElement;
    root.classList.remove(THEME_CLASS_MAP.light, THEME_CLASS_MAP.dark);

    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setResolvedTheme(systemTheme);
    } else {
      root.classList.add(THEME_CLASS_MAP[newTheme]);
      setResolvedTheme(newTheme);
    }
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
  };
}
