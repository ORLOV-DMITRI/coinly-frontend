'use client';

import { useAuth } from '@/lib/auth/authContext';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <div className="container">
        <div className={styles.dashboard}>
          <h1>Добро пожаловать, {user?.name}!</h1>
          <p className={styles.subtitle}>
            Здесь будет ваша статистика расходов и основная информация
          </p>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Расходы за месяц</h3>
              <p className={styles.value}>0 ₽</p>
            </div>
            <div className={styles.statCard}>
              <h3>Категорий</h3>
              <p className={styles.value}>0</p>
            </div>
            <div className={styles.statCard}>
              <h3>Товаров</h3>
              <p className={styles.value}>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
