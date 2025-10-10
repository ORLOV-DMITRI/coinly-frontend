import styles from './EditPriceModal.module.scss';
import { useState } from 'react';
import Modal from '@/shared/ui/Modal/Modal';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  expenseItemId: string;
  itemName: string;
  currentAmount: number;
  onSave: (expenseItemId: string, newAmount: number) => void;
};

export default function EditPriceModal({
  isOpen,
  onClose,
  expenseItemId,
  itemName,
  currentAmount,
  onSave,
}: Props) {
  const [amount, setAmount] = useState(currentAmount.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAmount = parseFloat(amount);
    if (isNaN(newAmount) || newAmount <= 0) return;

    onSave(expenseItemId, newAmount);
    onClose();
  };

  const handleClose = () => {
    setAmount(currentAmount.toString());
    onClose();
  };

  const isValid = !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Редактировать цену">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>{itemName}</div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="new-price">
            Новая цена
          </label>
          <input
            id="new-price"
            type="number"
            className={styles.input}
            placeholder="Введите цену"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
            autoFocus
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={!isValid}>
          Сохранить
        </button>
      </form>
    </Modal>
  );
}
