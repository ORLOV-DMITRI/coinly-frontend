'use client';

import styles from './DateSelector.module.scss';
import cn from 'classnames';
import { useState } from 'react';

type DateOption = 'today' | 'yesterday' | 'custom';

type Props = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
};

export default function DateSelector({ selectedDate, onDateChange, className }: Props) {
  const [activeOption, setActiveOption] = useState<DateOption>('today');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTodayClick = () => {
    setActiveOption('today');
    setShowCustomInput(false);
    onDateChange(new Date());
  };

  const handleYesterdayClick = () => {
    setActiveOption('yesterday');
    setShowCustomInput(false);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    onDateChange(yesterday);
  };

  const handleCustomClick = () => {
    setActiveOption('custom');
    setShowCustomInput(true);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      const date = new Date(dateString);
      onDateChange(date);
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.buttons}>
        <button
          type="button"
          className={cn(styles.btn, activeOption === 'today' && styles.active)}
          onClick={handleTodayClick}
        >
          Сегодня
        </button>
        <button
          type="button"
          className={cn(styles.btn, activeOption === 'yesterday' && styles.active)}
          onClick={handleYesterdayClick}
        >
          Вчера
        </button>
        <button
          type="button"
          className={cn(styles.btn, activeOption === 'custom' && styles.active)}
          onClick={handleCustomClick}
        >
          Другая...
        </button>
      </div>

      {showCustomInput && (
        <input
          type="date"
          className={styles.customInput}
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleCustomDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
      )}
    </div>
  );
}
