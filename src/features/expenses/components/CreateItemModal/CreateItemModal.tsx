'use client';

import styles from './CreateItemModal.module.scss';
import { useState } from 'react';
import Modal from '@/shared/ui/Modal/Modal';
import { useItems } from '@/features/items/hooks/useItems';
import type { Item } from '@/lib/types/api.types';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onItemCreated: (item: Item) => void;
};

export default function CreateItemModal({ isOpen, onClose, onItemCreated }: Props) {
  const { createItem, isCreating } = useItems();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(price);
    if (!name.trim() || isNaN(priceNum) || priceNum <= 0) return;

    try {
      const newItem = await new Promise<Item>((resolve, reject) => {
        createItem(
          {
            name: name.trim(),
            prices: [priceNum]
          },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error)
          }
        );
      });

      setName('');
      setPrice('');

      onItemCreated(newItem);
    } catch (error) {
      console.error('Ошибка создания товара:', error);
    }
  };

  const handleClose = () => {
    setName('');
    setPrice('');
    onClose();
  };

  const isFormValid = name.trim() && price && parseFloat(price) > 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Новый товар">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="item-name">
            Название товара
          </label>
          <input
            id="item-name"
            type="text"
            className={styles.input}
            placeholder="Например: Молоко"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            disabled={isCreating}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="item-price">
            Цена
          </label>
          <input
            id="item-price"
            type="number"
            className={styles.input}
            placeholder="Введите цену"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            disabled={isCreating}
          />
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!isFormValid || isCreating}
        >
          {isCreating ? 'Создание...' : 'Создать'}
        </button>
      </form>
    </Modal>
  );
}
