'use client';
import styles from './CategoryStatsList.module.scss';
import type { CategoryStat } from '@/lib/types/api.types';

type Props = {
  categories: CategoryStat[];
};

export default function CategoryStatsList({ categories }: Props) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };

  if (categories.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Нет категорий за выбранный период</p>
      </div>
    );
  }

  return (
    <div className={styles.categoryStatsList}>
      {categories.map((category) => (
        <div key={category.id || 'uncategorized'} className={styles.categoryItem}>
          <div className={styles.categoryInfo}>
            {category.emoji && <span className={styles.emoji}>{category.emoji}</span>}
            <span className={styles.name}>{category.name}</span>
          </div>
          <div className={styles.dots} />
          <span className={styles.total}>{formatAmount(category.total)}</span>
        </div>
      ))}
    </div>
  );
}
