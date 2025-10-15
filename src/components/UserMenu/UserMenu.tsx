'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserMenu.module.scss';
import cn from 'classnames';
import { useAuth } from '@/lib/auth/authContext';
import { useScrollLock } from '@/lib/hooks/useScrollLock';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

// Icons
import UserIcon from '/public/assets/svg/settings.svg'; // Временно используем settings как user icon
import LogoutIcon from '/public/assets/svg/action.svg';
import NewsIcon from '/public/assets/svg/plus.svg'; // Временно используем plus как "что нового"
import ChevronIcon from '/public/assets/svg/chevron.svg';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function UserMenu({ isOpen, setIsOpen }: Props) {
  const { logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isThemeSwitcherOpen, setIsThemeSwitcherOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useScrollLock(isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsThemeSwitcherOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/');
  };

  const handleWhatsNew = () => {
    setIsOpen(false);
    router.push('/updates');
  };

  return (
    <div className={styles.userMenu} ref={dropdownRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Меню пользователя"
      >
        {mounted ? (
          <>
            <UserIcon />
          </>
        ) : (
          <div style={{ width: 24, height: 24 }} />
        )}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {/* Пункт "Что нового" */}
          <button className={styles.menuItem} onClick={handleWhatsNew}>
            <NewsIcon />
            <span>Что нового</span>
          </button>

          {/* Смена темы */}
          <div className={styles.themeSection}>
            <ThemeSwitcher
              isOpen={isThemeSwitcherOpen}
              setIsOpen={setIsThemeSwitcherOpen}
            />
          </div>

          {/* Разделитель */}
          <div className={styles.separator} />

          {/* Выход */}
          <button className={styles.menuItem} onClick={handleLogout}>
            <LogoutIcon />
            <span>Выйти</span>
          </button>
        </div>
      )}
    </div>
  );
}