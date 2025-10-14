'use client'
import styles from './ProgressBar.module.scss'
import Bar from "@/shared/ui/Bar/Bar";
import Button from "@/shared/ui/Button/Button";
import WeeklyBars from "@/features/dashboard/components/WeeklyBars/WeeklyBars";
import { useAuth } from "@/lib/auth/authContext";

type Props = {
  currentSpent: number;
  month: string;
  onSetBudget: () => void;
};

export default function ProgressBar({ currentSpent, month, onSetBudget }: Props) {
  const { user } = useAuth();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + '₽';
  };

  if (!user?.monthlyBudget) {
    return (
      <section className={styles.progress}>
        <div className={styles.header}>
          <h3>Бюджет на месяц</h3>
        </div>
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            Укажите бюджет для отслеживания расходов
          </p>
          <Button variant="primary" onClick={onSetBudget}>
            Указать бюджет
          </Button>
        </div>
      </section>
    );
  }

  const percentage = Math.round((currentSpent / user.monthlyBudget) * 100);
  const percentageString = Math.min(percentage, 100) + '%';
  const weeklyBudget = user.monthlyBudget / 4;

  return (
    <section className={styles.progress}>
      <div className={styles.header}>
        <h3>Бюджет на месяц</h3>
        <div className={styles.headerActions}>
          <div className={styles.amount}>
            {formatAmount(currentSpent)} / {formatAmount(user.monthlyBudget)}
          </div>
          <Button
            variant="secondary"
            size="default"
            onClick={onSetBudget}
            className={styles.editBtn}
          >
            Изменить
          </Button>
        </div>
      </div>
      <Bar value={percentageString} />
      <WeeklyBars month={month} weeklyBudget={weeklyBudget} />
    </section>
  );
}
