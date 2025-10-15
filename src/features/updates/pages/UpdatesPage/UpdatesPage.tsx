'use client';

import styles from './UpdatesPage.module.scss';
import { UPDATES, getCategoryColor, getCategoryLabel } from '@/data/updates';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import UpdateTimeline from '../../components/UpdateTimeline/UpdateTimeline';

export default function UpdatesPage() {
  return (
    <div className="page">
      <PageHeader title="Что нового" actionType="back" />

      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>Обновления Coinly</h1>
          <p className={styles.heroDescription}>
            Следите за новыми возможностями и улучшениями приложения.
            Мы постоянно работаем над тем, чтобы сделать учёт расходов ещё удобнее!
          </p>
        </div>

        <UpdateTimeline updates={UPDATES} />

        <div className={styles.footer}>
          <p className={styles.footerText}>
            Есть идеи для улучшений? Мы всегда рады обратной связи! 💭
          </p>
        </div>
      </div>
    </div>
  );
}