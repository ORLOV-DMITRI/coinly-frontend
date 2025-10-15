'use client';
import { useQuery } from '@tanstack/react-query';
import styles from './WeeklyBars.module.scss';
import { expensesService } from '@/features/expenses/services/expensesService';
import type {WeeklyStatsData, WeekStat} from '@/lib/types/api.types';
import cn from 'classnames';
import {useState} from "react";

type Props = {
  weeklyBudget: number;
  weeklyStats:  WeeklyStatsData | undefined
};

export default function WeeklyBars({ weeklyBudget, weeklyStats }: Props) {

  if (!weeklyStats?.weeks) {
    return null;
  }

  const getCurrentWeek = () => {
    const today = new Date().getDate();
    return Math.ceil(today / 7);
  };

  const currentWeek = getCurrentWeek();

  const getWeekStatus = (weekNumber: number, spent: number, budget: number) => {
    if (weekNumber > currentWeek) return 'future';

    const percentage = (spent / budget) * 100;
    if (percentage <= 80) return 'success';
    if (percentage <= 100) return 'warning';
    return 'danger';
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };

  const [activeCard, setActiveCard] = useState(currentWeek)

  return (
    <div className={styles.weeklybars}>
      {weeklyStats.weeks.map((week: WeekStat) => {
        const percentage = Math.min((week.total / weeklyBudget) * 100, 100);
        const status = getWeekStatus(week.week, week.total, weeklyBudget);
        const isCurrent = week.week === currentWeek;
        const isFuture = week.week > currentWeek;

        return (
          <div
            key={week.week}
            onClick={() => setActiveCard(week.week)}
            className={cn(styles.weekCard, {
              [styles.current]: activeCard === week.week,
              [styles.future]: isFuture,
            })}
          >
            <div className={styles.weekLabel}>
              {week.week} неделя
            </div>

            <div className={styles.weekRange}>
              {week.range}
            </div>

            {!isFuture ? (
              <>
                <div className={styles.weekAmount}>
                  {formatAmount(week.total)} / {formatAmount(weeklyBudget)}
                </div>

                <div className={styles.weekBar}>
                  <div
                    className={cn(styles.weekBarFill, styles[status])}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className={cn(styles.weekPercentage, styles[status])}>
                  {Math.round(percentage)}%
                </div>
              </>
            ) : (
              <>
                <div className={styles.weekAmountPlaceholder}>
                  --- ₽
                </div>

                <div className={styles.weekBar}>
                  <div className={styles.weekBarEmpty} />
                </div>

                <div className={styles.weekPercentagePlaceholder}>
                  0%
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}