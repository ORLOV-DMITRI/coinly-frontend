'use client';

import styles from './PeriodSelector.module.scss';
import cn from 'classnames';

export type PeriodType = 'year' | 'month' | 'week';

type Props = {
  period: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
};

export default function PeriodSelector({ period, onPeriodChange }: Props) {
  return (
    <div className={styles.selector}>
      <button
        type="button"
        className={cn(styles.btn, period === 'year' && styles.active)}
        onClick={() => onPeriodChange('year')}
      >
        Год
      </button>
      <button
        type="button"
        className={cn(styles.btn, period === 'month' && styles.active)}
        onClick={() => onPeriodChange('month')}
      >
        Месяц
      </button>
      <button
        type="button"
        className={cn(styles.btn, period === 'week' && styles.active)}
        onClick={() => onPeriodChange('week')}
      >
        Неделя
      </button>
    </div>
  );
}
