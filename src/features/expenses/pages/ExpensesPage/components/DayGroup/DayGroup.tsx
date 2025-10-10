import styles from './DayGroup.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useRef, useEffect, useState, MouseEvent } from 'react';
import type { Expense } from '@/lib/types/api.types';
import ArrowIcon from '/public/assets/svg/chevron.svg'
import EditIcon from '/public/assets/svg/edit.svg'
import DeleteIcon from '/public/assets/svg/delete.svg'
import {useExpenses} from "@/features/expenses/hooks/useExpenses";
import {useConfirmDialog} from "@/shared/ui/ConfirmDialog/useConfirmDialog";
import ConfirmDialog from "@/shared/ui/ConfirmDialog/ConfirmDialog";
import {formatDate} from "@/shared/utils/formatDate";

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

  const {deleteExpense, isDeleting,} = useExpenses();
  const {dialogState, showConfirm} = useConfirmDialog();

  const handleDelete = async (e: MouseEvent) => {
    e.stopPropagation();
    if (!expense) return;

    const confirmed = await showConfirm({
      title: 'Удалить расход',
      message: `Вы действительно хотите удалить расход <br/> <span>от ${formatDate(expense.date)}</span>? Это действие нельзя отменить.`,
    });

    if (!confirmed) return;
    deleteExpense(expense.id);
  };

  const totalAmount = expense.items.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    }
  }, [expense.items]);

  const handleEditClick = (e: MouseEvent) => {
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
          <div className={styles.actions}>
            <button type="button" className={styles.editBtn} onClick={handleEditClick} aria-label="Редактировать расход" title={'Редактировать расход'}>
              <EditIcon/>
            </button>
            <button type="button" className={styles.editBtn} onClick={handleDelete} aria-label="Удалить расход" title={'Удалить расход'}>
              <DeleteIcon/>
            </button>
          </div>

          <span className={styles.total}>{totalAmount.toLocaleString('ru-RU')}₽</span>
        </div>
      </div>

      <div
        ref={contentRef}
        className={styles.content}
        style={{ height: isExpanded ? `${height + 10}px` : '0px' }}
      >
        <p>Товары</p>
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
                  {expenseItem.quantity > 1 && (
                    <div className={styles.itemMeta}>
                      {expenseItem.amount.toLocaleString('ru-RU')}₽ × {expenseItem.quantity}
                    </div>
                  )}
                </div>
                <div className={styles.itemAmount}>
                  {(expenseItem.amount * expenseItem.quantity).toLocaleString('ru-RU')}₽
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmDialog
          isOpen={dialogState.isOpen}
          title={dialogState.title}
          message={dialogState.message}
          confirmText={dialogState.confirmText}
          cancelText={dialogState.cancelText}
          onConfirm={dialogState.onConfirm}
          onCancel={dialogState.onCancel}
      />
    </div>
  );
}
