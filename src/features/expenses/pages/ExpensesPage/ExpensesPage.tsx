'use client';

import styles from './ExpensesPage.module.scss';
import { useState, useMemo } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { useExpensesView } from '../../hooks/useExpensesView';
import PeriodSelector, { type PeriodType } from './components/PeriodSelector/PeriodSelector';
import MonthSummary from './components/MonthSummary/MonthSummary';
import DayGroup from './components/DayGroup/DayGroup';
import EditPriceModal from './components/EditPriceModal/EditPriceModal';
import EmptyState from './components/EmptyState/EmptyState';
import Button from "@/shared/ui/Button/Button";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import CollapseIcon from '/public/assets/svg/collapse.svg'

type EditingItem = {
  expenseItemId: string;
  itemName: string;
  currentAmount: number;
};

export default function ExpensesPage() {
  const [period, setPeriod] = useState<PeriodType>('month');
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

  const { toggleExpense, isExpanded, collapseAll } = useExpensesView();

  const dateRange = useMemo(() => {
    const now = new Date();

    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23, 59, 59, 999
    );

    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 7,
          0, 0, 0, 0
        );
        break;
      case 'month':
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
          0, 0, 0, 0
        );
        break;
      case 'year':
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate(),
          0, 0, 0, 0
        );
        break;
      default:
        startDate = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate(),
          0, 0, 0, 0
        );
    }

    return {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }, [period]);

  const { expenses, isLoading, isFetching, updateExpense } = useExpenses(dateRange);


  const totalAmount = useMemo(() => {
    if (!expenses) return 0;
    return expenses.reduce((sum, expense) => {
      const expenseTotal = expense.items.reduce((itemSum, item) => itemSum + item.amount, 0);
      return sum + expenseTotal;
    }, 0);
  }, [expenses]);



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
  ) => {
    setEditingItem({
      expenseItemId,
      itemName,
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

  const hasExpenses = expenses && expenses.length > 0;
  const showEmptyState = !isLoading && !hasExpenses;

  return (
    <div className={styles.page}>
      <PageHeader title={'Расходы'} actionType={'link'} link={'/expenses/create'}/>

      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.loading}>Загрузка...</div>
        ) : showEmptyState ? (
          <EmptyState />
        ) : (
          <>
            <MonthSummary period={period} total={totalAmount} />

            <div className={styles.settings}>
              <PeriodSelector period={period} onPeriodChange={setPeriod} />

              {/*{isFetching && <span className={styles.fetchingIndicator}>⟳</span>}*/}


              <Button
                type="button"
                variant={'secondary'}
                size={'default'}
                onClick={collapseAll}
                className={styles.collapseBtn}
              >
                <span className={styles.icon}><CollapseIcon/></span>
                <span className={styles.text}>Закрыть все</span>
              </Button>
            </div>

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
        )}
      </div>

      {editingItem && (
        <EditPriceModal
          isOpen={true}
          onClose={() => setEditingItem(null)}
          expenseItemId={editingItem.expenseItemId}
          itemName={editingItem.itemName}
          currentAmount={editingItem.currentAmount}
          onSave={handleSavePrice}
        />
      )}
    </div>
  );
}
