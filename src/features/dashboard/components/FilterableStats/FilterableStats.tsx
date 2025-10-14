'use client';
import { useState, useEffect } from 'react';
import styles from './FilterableStats.module.scss';
import { useFilterableStats } from '../../hooks/useFilterableStats';
import type { FilterablePeriod, GroupByType } from '@/lib/types/api.types';
import PeriodSelector from '../PeriodSelector/PeriodSelector';
import GroupBySelector from '../GroupBySelector/GroupBySelector';
import CategoryStatsList from '../CategoryStatsList/CategoryStatsList';
import ItemStatsList from '../ItemStatsList/ItemStatsList';
import SkeletonLoading from "@/shared/ui/SkeletonLoading/SkeletonLoading";

export default function FilterableStats() {
  const [period, setPeriod] = useState<FilterablePeriod>('week');
  const [value, setValue] = useState<string>('');
  const [groupBy, setGroupBy] = useState<GroupByType>('category');

  useEffect(() => {
    const today = new Date().getDate();
    const currentWeek = Math.ceil(today / 7);
    setValue(String(currentWeek));
  }, []);

  const { data: stats, isLoading } = useFilterableStats({
    period,
    value,
    groupBy,
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };


  return (
    <div className={styles.filterableStats}>
      <div className={styles.filters}>
        <PeriodSelector
          period={period}
          value={value}
          onPeriodChange={setPeriod}
          onValueChange={setValue}
        />
        <GroupBySelector groupBy={groupBy} onChange={setGroupBy} />
      </div>

      <div className={styles.statsContainer}>

        {isLoading && <div className={styles.skeleton}><SkeletonLoading variant={'block'} count={3}/></div>}

        {!stats && !isLoading && (
            <div className={styles.filterableStats}>
              <p className={styles.noData}>Нет данных за выбранный период</p>
            </div>
        )}

        {!isLoading && stats && groupBy === 'category' && stats.byCategory && (
          <CategoryStatsList categories={stats.byCategory} />
        )}
        {!isLoading && stats && groupBy === 'item' && stats.byItem && (
          <ItemStatsList items={stats.byItem} />
        )}


      </div>

      <div className={styles.total}>
        <span className={styles.totalLabel}>Итого:</span>
        <span className={styles.totalAmount}>{stats && formatAmount(stats.total)}</span>
      </div>
    </div>
  );
}
