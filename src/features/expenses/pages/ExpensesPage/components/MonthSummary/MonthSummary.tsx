'use client';

import styles from './MonthSummary.module.scss';

type Props = {
  label: string;
  total: number;
};

export default function MonthSummary({ label, total }: Props) {
  return (
    <div className={styles.summary}>
      <div className={styles.row}>
        <span className={styles.label}>{label}</span>
        <span className={styles.amount}>{total.toLocaleString('ru-RU')}₽</span>
      </div>
    </div>
  );
}
