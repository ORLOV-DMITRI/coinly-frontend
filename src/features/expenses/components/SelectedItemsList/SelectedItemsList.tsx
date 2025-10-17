import styles from './SelectedItemsList.module.scss';
import cn from 'classnames';
import type { Item } from '@/lib/types/api.types';

type SelectedItem = {
  item: Item;
  price: number;
  quantity: number;
};

type Props = {
  selectedItems: SelectedItem[];
  totalAmount: number;
  onQuantityChange: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  isAside?: boolean;
  className?: string;
};

export default function SelectedItemsList({
  selectedItems,
  totalAmount,
  onQuantityChange,
  onRemoveItem,
  isAside = false,
  className
}: Props) {
  return (
    <div className={cn(styles.selectedList, isAside && styles.asideMode, className)}>
      {selectedItems.map((selectedItem, index) => (
        <div key={index} className={styles.selectedCard}>
          <div className={styles.selectedInfo}>
            <div className={styles.selectedName}>
              {selectedItem.item.name}
            </div>
            <div className={styles.priceRow}>
              <span className={styles.unitPrice}>{selectedItem.price}₽</span>
              <div className={styles.quantityControls}>
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={() => onQuantityChange(index, selectedItem.quantity - 1)}
                  disabled={selectedItem.quantity <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  className={styles.quantityInput}
                  value={selectedItem.quantity}
                  disabled={true}
                  min="1"
                />
                <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={() => onQuantityChange(index, selectedItem.quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className={styles.totalPrice}>{isAside ? '' : '='} {selectedItem.price * selectedItem.quantity}₽</span>
            </div>
          </div>
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => onRemoveItem(index)}
          >
            ×
          </button>
        </div>
      ))}

      <div className={styles.totalCard}>
        <div className={styles.totalLabel}>Итого:</div>
        <div className={styles.totalAmount}>{totalAmount}₽</div>
      </div>
    </div>
  );
}