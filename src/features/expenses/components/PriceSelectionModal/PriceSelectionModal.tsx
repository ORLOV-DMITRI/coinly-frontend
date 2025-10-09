'use client';

import styles from './PriceSelectionModal.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import Modal from '@/shared/ui/Modal/Modal';
import type { Item } from '@/lib/types/api.types';

type Props = {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onPriceSelect: (price: number) => void;
};

export default function PriceSelectionModal({ item, isOpen, onClose, onPriceSelect }: Props) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPrice, setCustomPrice] = useState('');

  const handlePriceClick = (price: number) => {
    onPriceSelect(price);
    onClose();
    setShowCustomInput(false);
    setCustomPrice('');
  };

  const handleCustomPriceSubmit = () => {
    const price = parseFloat(customPrice);
    if (!isNaN(price) && price > 0) {
      onPriceSelect(price);
      onClose();
      setShowCustomInput(false);
      setCustomPrice('');
    }
  };

  const handleClose = () => {
    onClose();
    setShowCustomInput(false);
    setCustomPrice('');
  };

  const lastUsedPrice = item.prices.length > 0 ? item.prices[0] : null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Выберите цену">
      <div className={styles.content}>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>{item.name}</div>
          {item.category && (
            <div className={styles.itemCategory}>
              {item.category.name}
            </div>
          )}
        </div>

        {item.prices.length > 0 && (
          <>
            <div className={styles.priceLabel}>Выбери цену</div>
            <div className={styles.priceButtons}>
              {item.prices.map((price, index) => (
                <button
                  key={`${price}-${index}`}
                  type="button"
                  className={cn(
                    styles.priceBtn,
                    price === lastUsedPrice && styles.lastUsed
                  )}
                  onClick={() => handlePriceClick(price)}
                >
                  {price}₽
                </button>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          className={styles.customPriceBtn}
          onClick={() => setShowCustomInput(!showCustomInput)}
        >
          Другая цена...
        </button>

        {showCustomInput && (
          <div className={styles.customInputWrapper}>
            <input
              type="number"
              className={styles.customInput}
              placeholder="Введите цену"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              autoFocus
              min="0"
              step="0.01"
            />
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleCustomPriceSubmit}
              disabled={!customPrice || parseFloat(customPrice) <= 0}
            >
              Готово
            </button>
          </div>
        )}

        {lastUsedPrice !== null && (
          <div className={styles.hint}>● Последняя использованная цена</div>
        )}
      </div>
    </Modal>
  );
}
