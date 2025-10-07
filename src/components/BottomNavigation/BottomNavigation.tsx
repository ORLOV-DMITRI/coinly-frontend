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


export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navItems}>
        <Link href={'/dashboard'} className={cn(styles.navItem, pathname === '/dashboard' && styles.active)}>
          <HomeIcon className={styles.icon} />
          <span className={styles.label}>Главная</span>
        </Link>

        <Link href={'/expenses'} className={cn(styles.navItem, pathname === '/expenses' && styles.active)}>
          <WalletIcon className={styles.icon} />
          <span className={styles.label}>Расходы</span>
        </Link>


        <button className={styles.centralButton}>
          <AddIcon />
        </button>


        <Link href={'/categories'} className={cn(styles.navItem, pathname === '/categories' && styles.active)}>
          <FolderIcon className={styles.icon} />
          <span className={styles.label}>Категории</span>
        </Link>


        <Link href={'/items'} className={cn(styles.navItem, pathname === '/items' && styles.active)}>
          <ShoppingBagIcon className={styles.icon} />
          <span className={styles.label}>Товары</span>
        </Link>
      </div>
    </nav>
  );
}
