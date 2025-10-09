'use client';

import styles from './DayGroup.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import type { Expense } from '@/lib/types/api.types';

type Props = {
  expense: Expense;
  dateLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: (expenseItemId: string, currentAmount: number, itemName: string, categoryName: string | null) => void;
};

export default function DayGroup({ expense, dateLabel, isExpanded, onToggle, onItemClick }: Props) {
  const router = useRouter();

  const totalAmount = expense.items.reduce((sum, item) => sum + item.amount, 0);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/expenses/edit/${expense.id}`);
  };

  return (
    <div className={styles.group}>
      <div className={styles.header} onClick={onToggle}>
        <div className={styles.headerLeft}>
          <span className={styles.icon}>{isExpanded ? '▼' : '▶'}</span>
          <span className={styles.date}>{dateLabel}</span>
        </div>
        <div className={styles.headerRight}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={handleEditClick}
            aria-label="Редактировать расход"
          >
            ✏️
          </button>
          <span className={styles.total}>{totalAmount.toLocaleString('ru-RU')}₽</span>
        </div>
      </div>

      <div className={cn(styles.content, isExpanded && styles.expanded)}>
        <div className={styles.list}>
          {expense.items.map((expenseItem) => {
            const categoryName = expenseItem.item.category?.name || null;

            return (
              <div
                key={expenseItem.id}
                className={styles.item}
                onClick={() => onItemClick(
                  expenseItem.id,
                  expenseItem.amount,
                  expenseItem.item.name,
                  categoryName
                )}
              >
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{expenseItem.item.name}</div>
                  {categoryName && (
                    <div className={styles.itemMeta}>
                      <span className={styles.category}>{categoryName}</span>
                    </div>
                  )}
                </div>
                <div className={styles.itemAmount}>
                  {expenseItem.amount.toLocaleString('ru-RU')}₽
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
