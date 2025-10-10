'use client';

import styles from './PriceSelectionModal.module.scss';
import cn from 'classnames';
import { useState, useEffect } from 'react';
import Modal from '@/shared/ui/Modal/Modal';
import type { Item } from '@/lib/types/api.types';
import Button from "@/shared/ui/Button/Button";

type Props = {
  item: Item;
  isOpen: boolean;
  onClose: () => void;
  onPriceSelect: (price: number, quantity: number) => void;
};

export default function PriceSelectionModal({ item, isOpen, onClose, onPriceSelect }: Props) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customPrice, setCustomPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  // Автоматически выбираем первую цену при открытии модалки
  useEffect(() => {
    if (isOpen && item.prices.length > 0) {
      setSelectedPrice(item.prices[0]);
    }
  }, [isOpen, item.id, item.prices]);

  const handlePriceClick = (price: number) => {
    setSelectedPrice(price);
  };

  const handleConfirm = () => {
    if (selectedPrice !== null && quantity > 0) {
      onPriceSelect(selectedPrice, quantity);
      onClose();
      resetState();
    }
  };

  const handleCustomPriceSubmit = () => {
    const price = parseFloat(customPrice);
    if (!isNaN(price) && price > 0) {
      setSelectedPrice(price);
      setShowCustomInput(false);
    }
  };

  const resetState = () => {
    setShowCustomInput(false);
    setCustomPrice('');
    setQuantity(1);
    setSelectedPrice(null);
  };

  const handleClose = () => {
    onClose();
    resetState();
  };

  const lastUsedPrice = item.prices.length > 0 ? item.prices[0] : null;
  const totalAmount = selectedPrice !== null ? selectedPrice * quantity : 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Выберите цену">
      <div className={styles.content}>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>{item.name}</div>
        </div>

        {item.prices.length > 0 && (
          <>
            <div className={styles.priceLabel}>Выбери цену</div>
            <div className={styles.priceButtons}>
              {item.prices.map((price, index) => (
                <Button
                  key={`${price}-${index}`}
                  type="button"
                  variant={selectedPrice ? 'primary' : 'secondary'}
                  size={'default'}
                  onClick={() => handlePriceClick(price)}
                >
                  {price}₽
                </Button>
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
              Применить
            </button>
          </div>
        )}

        <>
          <div className={styles.quantityWrapper}>
            <label className={styles.quantityLabel}>Количество</label>
            <div className={styles.quantityControls}>
              <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
              >
                −
              </button>
              <input
                  type="number"
                  className={styles.quantityInput}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val) && val > 0) setQuantity(val);
                  }}
                  min="1"
              />
              <button
                  type="button"
                  className={styles.quantityBtn}
                  onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.totalWrapper}>
            <div className={styles.totalLabel}>Итого:</div>
            <div className={styles.totalAmount}>{totalAmount}₽</div>
          </div>

          <button
              type="button"
              className={styles.confirmBtn}
              onClick={handleConfirm}
          >
            Добавить
          </button>
        </>

        {lastUsedPrice !== null && !selectedPrice && (
          <div className={styles.hint}>● Последняя использованная цена</div>
        )}
      </div>
    </Modal>
  );
}
