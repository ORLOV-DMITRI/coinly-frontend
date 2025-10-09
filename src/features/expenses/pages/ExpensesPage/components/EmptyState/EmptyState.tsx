import styles from './EmptyState.module.scss';

export default function EmptyState() {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>📊</div>
      <h3 className={styles.title}>Нет расходов</h3>
      <p className={styles.text}>Добавьте свой первый расход, чтобы начать отслеживать траты</p>
    </div>
  );
}
