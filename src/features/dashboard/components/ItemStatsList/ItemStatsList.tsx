'use client';
import styles from './ItemStatsList.module.scss';
import type { ItemStat } from '@/lib/types/api.types';

type Props = {
  items: ItemStat[];
};

export default function ItemStatsList({ items }: Props) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Нет товаров за выбранный период</p>
      </div>
    );
  }

  return (
    <div className={styles.itemStatsList}>
      {items.map((item) => (
        <div key={item.id} className={styles.itemRow}>
          <div className={styles.itemInfo}>
            <span className={styles.name}>{item.name}</span>
          </div>
          <div className={styles.dots} />
          <div className={styles.itemStats}>
            <span className={styles.total}>{formatAmount(item.total)}</span>
            <span className={styles.details}>
              × {item.count} шт (средняя: {formatAmount(item.averagePrice)})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
