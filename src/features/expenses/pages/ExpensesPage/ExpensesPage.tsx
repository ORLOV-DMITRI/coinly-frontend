'use client';

import styles from './ExpensesPage.module.scss';
import { useState, useMemo } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { useExpensesView } from '../../hooks/useExpensesView';
import PeriodSelector, { type PeriodType } from './components/PeriodSelector/PeriodSelector';
import MonthSummary from './components/MonthSummary/MonthSummary';
import AccordionControls from './components/AccordionControls/AccordionControls';
import DayGroup from './components/DayGroup/DayGroup';
import EditPriceModal from './components/EditPriceModal/EditPriceModal';
import EmptyState from './components/EmptyState/EmptyState';
import type { Expense } from '@/lib/types/api.types';

type EditingItem = {
  expenseItemId: string;
  itemName: string;
  categoryName: string | null;
  currentAmount: number;
};

export default function ExpensesPage() {
  const [period, setPeriod] = useState<PeriodType>('month');
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const { mode, changeMode, toggleExpense, isExpanded } = useExpensesView();

  const dateRange = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now);
    const endDate = new Date(now);

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }, [period]);

  const { expenses, isLoading, updateExpense } = useExpenses(dateRange);

  const totalAmount = useMemo(() => {
    if (!expenses) return 0;
    return expenses.reduce((sum, expense) => {
      const expenseTotal = expense.items.reduce((itemSum, item) => itemSum + item.amount, 0);
      return sum + expenseTotal;
    }, 0);
  }, [expenses]);

  const periodLabel = useMemo(() => {
    const now = new Date();
    const monthNames = [
      'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    switch (period) {
      case 'week':
        return 'Последняя неделя';
      case 'month':
        return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
      case 'year':
        return `${now.getFullYear()}`;
    }
  }, [period]);

  const formatDateLabel = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    if (isSameDay(date, now)) {
      return `Сегодня, ${date.getDate()} ${getMonthName(date.getMonth())}`;
    }

    if (isSameDay(date, yesterday)) {
      return `Вчера, ${date.getDate()} ${getMonthName(date.getMonth())}`;
    }

    return `${date.getDate()} ${getMonthName(date.getMonth())}`;
  };

  const getMonthName = (monthIndex: number): string => {
    const monthNames = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return monthNames[monthIndex];
  };

  const handleItemClick = (
    expenseItemId: string,
    currentAmount: number,
    itemName: string,
    categoryName: string | null
  ) => {
    setEditingItem({
      expenseItemId,
      itemName,
      categoryName,
      currentAmount,
    });
  };

  const handleSavePrice = (expenseItemId: string, newAmount: number) => {
    const expense = expenses?.find((exp) =>
      exp.items.some((item) => item.id === expenseItemId)
    );

    if (!expense) return;

    updateExpense({
      id: expense.id,
      data: { amount: newAmount },
    });
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerTop}>
              <h1 className={styles.title}>Расходы</h1>
              <PeriodSelector period={period} onPeriodChange={setPeriod} />
            </div>
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.loading}>Загрузка...</div>
        </div>
      </div>
    );
  }

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.headerTop}>
            <h1 className={styles.title}>Расходы</h1>
            <PeriodSelector period={period} onPeriodChange={setPeriod} />
          </div>
        </div>
      </header>

      <div className={styles.container}>
        {hasExpenses ? (
          <>
            <MonthSummary label={periodLabel} total={totalAmount} />

            <AccordionControls mode={mode} onModeChange={changeMode} />

            <div className={styles.expensesList}>
              {expenses.map((expense, index) => (
                <DayGroup
                  key={expense.id}
                  expense={expense}
                  dateLabel={formatDateLabel(expense.date)}
                  isExpanded={isExpanded(expense.id, index)}
                  onToggle={() => toggleExpense(expense.id)}
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {editingItem && (
        <EditPriceModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          expenseItemId={editingItem.expenseItemId}
          itemName={editingItem.itemName}
          categoryName={editingItem.categoryName}
          currentAmount={editingItem.currentAmount}
          onSave={handleSavePrice}
        />
      )}
    </div>
  );
}
