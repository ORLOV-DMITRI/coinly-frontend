import { useState } from 'react';
import styles from './PeriodSelector.module.scss';
import type { FilterablePeriod } from '@/lib/types/api.types';
import cn from 'classnames';
import Select from "@/shared/ui/Select/Select";

type Props = {
  period: FilterablePeriod;
  value: string;
  onPeriodChange: (period: FilterablePeriod) => void;
  onValueChange: (value: string) => void;
};

export default function PeriodSelector({ period, value, onPeriodChange, onValueChange }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePeriodClick = (newPeriod: FilterablePeriod) => {
    onPeriodChange(newPeriod);
    setShowDropdown(false);

    if (newPeriod === 'week') {
      const today = new Date().getDate();
      const currentWeek = Math.ceil(today / 7);
      onValueChange(String(currentWeek));
    } else if (newPeriod === 'month') {
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      onValueChange(currentMonth);
    } else if (newPeriod === 'year') {
      onValueChange(String(new Date().getFullYear()));
    }
  };

  const handleValueSelect = (newValue: string) => {
    onValueChange(newValue);
    setShowDropdown(false);
  };

  const weekOptions = [
    { value: '1', label: '1 неделя (1-7)' },
    { value: '2', label: '2 неделя (8-14)' },
    { value: '3', label: '3 неделя (15-21)' },
    { value: '4', label: '4 неделя (22-31)' },
  ];

  const generateMonthOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    return options;
  };

  const monthOptions = generateMonthOptions();

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
