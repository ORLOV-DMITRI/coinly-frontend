import { useState } from 'react';
import styles from './AddOneTimeExpenseModal.module.scss';
import Modal from '@/shared/ui/Modal/Modal';
import Button from '@/shared/ui/Button/Button';
import { useOneTimeExpenses } from '../../hooks/useOneTimeExpenses';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  month: string;
};

export default function AddOneTimeExpenseModal({ isOpen, onClose, month }: Props) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const { createExpense, isCreating } = useOneTimeExpenses({ month });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const amountNumber = Number(amount);
    if (!name.trim() || !amountNumber || amountNumber < 0) {
      return;
    }

    createExpense(
      { name: name.trim(), amount: amountNumber },
      {
        onSuccess: () => {
          setName('');
          setAmount('');
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    setName('');
    setAmount('');
    onClose();
  };

  const isValid = name.trim() && amount && Number(amount) >= 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Добавить разовый расход">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Название
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Интернет, Стрижка, Подарки..."
            className={styles.input}
            disabled={isCreating}
            autoComplete="off"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="amount" className={styles.label}>
            Сумма
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="amount"
              type="number"
              min="0"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="800"
              className={styles.input}
              disabled={isCreating}
            />
            <span className={styles.currency}>₽</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isCreating}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid || isCreating}
          >
            {isCreating ? 'Добавление...' : 'Добавить'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
