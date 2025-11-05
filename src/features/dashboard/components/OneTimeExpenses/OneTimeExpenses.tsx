'use client'
import { useState } from 'react';
import styles from './OneTimeExpenses.module.scss';
import cn from 'classnames';
import { useOneTimeExpenses, useOneTimeExpensesTotal } from '../../hooks/useOneTimeExpenses';
import PlusIcon from '/public/assets/svg/plus.svg';
import ChevronIcon from '/public/assets/svg/chevron.svg';
import DeleteIcon from '/public/assets/svg/delete.svg';

type Props = {
  month: string;
  onAdd: () => void;
};

export default function OneTimeExpenses({ month, onAdd }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { expenses, isLoading, deleteExpense, isDeleting } = useOneTimeExpenses({ month });
  const { total } = useOneTimeExpensesTotal({ month });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Удалить этот разовый расход?')) {
      deleteExpense(id);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <section className={styles.container}>
      <div className={styles.header} onClick={toggleExpanded}>
        <div className={styles.headerLeft}>
          <h3>Разовые расходы</h3>
          {expenses.length > 0 && (
            <button
              className={cn(styles.chevron, isExpanded && styles.chevronExpanded)}
              aria-label={isExpanded ? 'Свернуть' : 'Развернуть'}
            >
              <ChevronIcon />
            </button>
          )}
        </div>
        <div className={styles.headerRight}>
          <span className={styles.total}>{formatAmount(total)}</span>
          <button
            className={styles.addBtn}
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            aria-label="Добавить разовый расход"
          >
            <PlusIcon />
          </button>
        </div>
      </div>

      {isExpanded && expenses.length > 0 && (
        <div className={styles.list}>
          {expenses.map((expense) => (
            <div key={expense.id} className={styles.item}>
              <span className={styles.itemName}>{expense.name}</span>
              <div className={styles.itemRight}>
                <span className={styles.itemAmount}>{formatAmount(expense.amount)}</span>
                <button
                  className={styles.deleteBtn}
                  onClick={(e) => handleDelete(expense.id, e)}
                  disabled={isDeleting}
                  aria-label="Удалить"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {expenses.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Нет разовых расходов</p>
        </div>
      )}
    </section>
  );
}
