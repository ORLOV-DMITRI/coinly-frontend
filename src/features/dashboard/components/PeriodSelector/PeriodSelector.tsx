import { useState, useEffect } from 'react';
import styles from './PeriodSelector.module.scss';
import type { FilterablePeriod } from '@/lib/types/api.types';
import cn from 'classnames';
import Select from "@/shared/ui/Select/Select";
import { useAuth } from '@/lib/auth/authContext';
import { getFinancialMonthOptions, getCurrentFinancialMonth } from '@/shared/utils/financialMonth';
import { useWeeklyStats } from '@/features/dashboard/hooks/useWeeklyStats';

type Props = {
  period: FilterablePeriod;
  value: string;
  onPeriodChange: (period: FilterablePeriod) => void;
  onValueChange: (value: string) => void;
};

export default function PeriodSelector({ period, value, onPeriodChange, onValueChange }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuth();

  const monthStartDay = user?.monthStartDay || 1;

  // Получаем текущий финансовый месяц
  const currentFinancialMonth = getCurrentFinancialMonth(monthStartDay);

  // Получаем недельную статистику для текущего месяца
  const { data: weeklyStats } = useWeeklyStats(currentFinancialMonth);

  const handlePeriodClick = (newPeriod: FilterablePeriod) => {
    onPeriodChange(newPeriod);
    setShowDropdown(false);

    if (newPeriod === 'week') {
      // Устанавливаем текущую неделю (по умолчанию 1)
      onValueChange('1');
    } else if (newPeriod === 'month') {
      onValueChange(currentFinancialMonth);
    } else if (newPeriod === 'year') {
      onValueChange(String(new Date().getFullYear()));
    }
  };

  const handleValueSelect = (newValue: string) => {
    onValueChange(newValue);
    setShowDropdown(false);
  };

  // Генерируем опции для недель на основе данных из weeklyStats
  const weekOptions = weeklyStats?.weeks.map((week) => ({
    value: String(week.week),
    label: `${week.week} неделя (${week.range})`,
  })) || [
    { value: '1', label: '1 неделя' },
    { value: '2', label: '2 неделя' },
    { value: '3', label: '3 неделя' },
    { value: '4', label: '4 неделя' },
  ];

  // Генерируем опции для финансовых месяцев
  const monthOptions = getFinancialMonthOptions(12, monthStartDay);

  const yearOptions = [
    { value: '2025', label: '2025' },
    { value: '2024', label: '2024' },
  ];

  const getValueLabel = () => {
    if (period === 'week') {
      const week = weekOptions.find(w => w.value === value);
      return week?.label || 'Выберите неделю';
    } else if (period === 'month') {
      const month = monthOptions.find(m => m.value === value);
      return month?.label || 'Выберите месяц';
    } else if (period === 'year') {
      return value || 'Выберите год';
    }
    return '';
  };

  const getCurrentOptions = () => {
    if (period === 'week') return weekOptions;
    if (period === 'month') return monthOptions;
    if (period === 'year') return yearOptions;
    return [];
  };

  return (
    <div className={styles.periodSelector}>
      <div className={styles.periodButtons}>
        <button
          type="button"
          className={cn(styles.periodButton, { [styles.active]: period === 'week' })}
          onClick={() => handlePeriodClick('week')}
        >
          Неделя
        </button>
        <button
          type="button"
          className={cn(styles.periodButton, { [styles.active]: period === 'month' })}
          onClick={() => handlePeriodClick('month')}
        >
          Месяц
        </button>
        <button
          type="button"
          className={cn(styles.periodButton, { [styles.active]: period === 'year' })}
          onClick={() => handlePeriodClick('year')}
        >
          Год
        </button>
      </div>

      <Select isShow={showDropdown} setIsShow={(value) => setShowDropdown(value)} value={getValueLabel()} options={getCurrentOptions()} handleSelect={handleValueSelect}/>

    </div>
  );
}
