'use client';

import styles from './AccordionControls.module.scss';
import cn from 'classnames';
import type { AccordionMode } from '@/features/expenses/types/expensesView.types';

type Props = {
  mode: AccordionMode;
  onModeChange: (mode: AccordionMode) => void;
};

export default function AccordionControls({ mode, onModeChange }: Props) {
  return (
    <div className={styles.controls}>
      <button
        type="button"
        className={cn(styles.btn, mode === 'all-collapsed' && styles.active)}
        onClick={() => onModeChange('all-collapsed')}
      >
        Все свернуты
      </button>
      <button
        type="button"
        className={cn(styles.btn, mode === 'all-expanded' && styles.active)}
        onClick={() => onModeChange('all-expanded')}
      >
        Все открыты
      </button>
      <button
        type="button"
        className={cn(styles.btn, mode === 'first-expanded' && styles.active)}
        onClick={() => onModeChange('first-expanded')}
      >
        Первая открыта
      </button>
    </div>
  );
}
