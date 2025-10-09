import { useTheme, Theme } from '@/lib/hooks/useTheme';
import { useState, useRef, useEffect } from 'react';
import styles from './ThemeSwitcher.module.scss';
import cn from 'classnames';
import SunIcon from '/public/assets/svg/sun.svg';
import MoonIcon from '/public/assets/svg/moon.svg';
import MonitorIcon from '/public/assets/svg/monitor.svg';

const THEME_OPTIONS: { value: Theme; label: string; icon: any }[] = [
  { value: 'light', label: 'Светлая', icon: SunIcon },
  { value: 'dark', label: 'Тёмная', icon: MoonIcon },
  { value: 'system', label: 'Системная', icon: MonitorIcon },
];

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function ThemeSwitcher({isOpen, setIsOpen}:Props) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEME_OPTIONS.find(option => option.value === theme);
  const CurrentIcon = currentTheme?.icon || SunIcon;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className={styles.themeSwitcher} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Выбрать тему"
      >
        {mounted ? (
          <CurrentIcon />
        ) : (
          <div style={{ width: 20, height: 20 }} />
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {THEME_OPTIONS.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                className={cn(styles.option, theme === option.value && styles.active)}
                onClick={() => handleThemeChange(option.value)}
              >
                <Icon />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
