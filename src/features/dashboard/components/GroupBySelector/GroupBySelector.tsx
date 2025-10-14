'use client';
import styles from './GroupBySelector.module.scss';
import type { GroupByType } from '@/lib/types/api.types';
import cn from 'classnames';

type Props = {
  groupBy: GroupByType;
  onChange: (groupBy: GroupByType) => void;
};

export default function GroupBySelector({ groupBy, onChange }: Props) {
  return (
    <div className={styles.groupBySelector}>
      <button
        type="button"
        className={cn(styles.groupByButton, { [styles.active]: groupBy === 'category' })}
        onClick={() => onChange('category')}
      >
        Категории
      </button>
      <button
        type="button"
        className={cn(styles.groupByButton, { [styles.active]: groupBy === 'item' })}
        onClick={() => onChange('item')}
      >
        Товары
      </button>
    </div>
  );
}
