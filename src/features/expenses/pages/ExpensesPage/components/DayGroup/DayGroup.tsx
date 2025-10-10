import styles from './DayGroup.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState } from 'react';
import type { Expense } from '@/lib/types/api.types';
import ArrowIcon from '/public/assets/svg/chevron.svg'

type Props = {
  expense: Expense;
  dateLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
  onItemClick: (expenseItemId: string, currentAmount: number, itemName: string) => void;
};

export default function DayGroup({ expense, dateLabel, isExpanded, onToggle, onItemClick }: Props) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  const totalAmount = expense.items.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    }
  }, [expense.items]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/expenses/edit/${expense.id}`);
  };

  return (
    <div className={styles.group}>
      <div className={cn(styles.header, isExpanded && styles.open)} onClick={onToggle}>
        <div className={styles.headerLeft}>
          <span className={cn(styles.icon)}><ArrowIcon/></span>
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

      <div
        ref={contentRef}
        className={styles.content}
        style={{ height: isExpanded ? `${height}px` : '0px' }}
      >
        <div className={styles.list}>
          {expense.items.map((expenseItem) => {
            return (
              <div
                key={expenseItem.id}
                className={styles.item}
                onClick={() => onItemClick(
                  expenseItem.id,
                  expenseItem.amount,
                  expenseItem.item.name,
                )}
              >
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{expenseItem.item.name}</div>
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
