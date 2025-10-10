'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNavigation.module.scss';
import cn from 'classnames';
import HomeIcon from '/public/assets/svg/home.svg';
import WalletIcon from '/public/assets/svg/wallet.svg';
import FolderIcon from '/public/assets/svg/folder.svg';
import ShoppingBagIcon from '/public/assets/svg/shopping-bag.svg';
import AddIcon from '/public/assets/svg/action.svg';
import Logo from '/public/assets/svg/logo.svg'


export default function BottomNavigation() {
  const pathname = usePathname();

    const isHideCenterBtn = () => {
        const pathsToHide = [
            '/items/create',
            '/items/edit',
            '/categories/create',
            '/categories/edit',
        ];
        return pathsToHide.some(path => pathname.startsWith(path));
    };

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navItems}>
        <Link href={'/dashboard'} className={cn(styles.navItem, pathname.startsWith('/dashboard') && styles.active)}>
          <HomeIcon className={styles.icon} />
          <span className={styles.label}>Главная</span>
        </Link>

        <Link href={'/expenses'} className={cn(styles.navItem, pathname.startsWith('/expenses') && styles.active)}>
          <WalletIcon className={styles.icon} />
          <span className={styles.label}>Расходы</span>
        </Link>



          <Link href={'/expenses/create'} className={cn(styles.centralButton)}>
              <AddIcon />
          </Link>


        <Link href={'/categories'} className={cn(styles.navItem, pathname.startsWith('/categories') && styles.active)}>
          <FolderIcon className={styles.icon} />
          <span className={styles.label}>Категории</span>
        </Link>


        <Link href={'/items'} className={cn(styles.navItem, pathname.startsWith('/items') && styles.active)}>
          <ShoppingBagIcon className={styles.icon} />
          <span className={styles.label}>Товары</span>
        </Link>
      </div>
    </nav>
  );
}
