import { useState } from 'react';
import styles from './SetBudgetModal.module.scss';
import Modal from '@/shared/ui/Modal/Modal';
import Button from '@/shared/ui/Button/Button';
import { useAuth } from '@/lib/auth/authContext';
import cn from 'classnames';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SetBudgetModal({ isOpen, onClose }: Props) {
  const { user, updateBudget, isUpdatingBudget } = useAuth();
  const [monthlyBudget, setMonthlyBudget] = useState(user?.monthlyBudget?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const budgetNumber = Number(monthlyBudget);
    if (!budgetNumber || budgetNumber <= 0) {
      return;
    }

    updateBudget(budgetNumber);
    onClose();
  };

  const handleClose = () => {
    setMonthlyBudget(user?.monthlyBudget?.toString() || '');
    onClose();
  };

  const isValid = monthlyBudget && Number(monthlyBudget) > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={user?.monthlyBudget ? 'Изменить бюджет' : 'Указать бюджет'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="monthlyBudget" className={styles.label}>
            Бюджет на месяц
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="monthlyBudget"
              type="number"
              min="1"
              step="1"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(e.target.value)}
              placeholder="30000"
              className={styles.input}
              disabled={isUpdatingBudget}
            />
            <span className={styles.currency}>₽</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isUpdatingBudget}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isUpdatingBudget}
          >
            {isUpdatingBudget ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}