'use client';

import styles from './CreateExpensePage.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DateSelector from '../../components/DateSelector/DateSelector';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import PriceSelectionModal from '../../components/PriceSelectionModal/PriceSelectionModal';
import { useExpenses } from '../../hooks/useExpenses';
import type { Item } from '@/lib/types/api.types';

type SelectedItem = {
  item: Item;
  price: number;
};

export default function CreateExpensePage() {
  const router = useRouter();
  const { createExpense, isCreating } = useExpenses();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const handleItemSelect = (item: Item) => {
    setCurrentItem(item);
    setIsPriceModalOpen(true);
  };

  const handlePriceSelect = (price: number) => {
    if (currentItem) {
      setSelectedItems(prev => [...prev, { item: currentItem, price }]);
      setCurrentItem(null);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const totalAmount = selectedItems.reduce((sum, { price }) => sum + price, 0);

  const handleSubmit = () => {
    if (selectedItems.length === 0) return;

    createExpense({
      items: selectedItems.map(({ item, price }) => ({
        itemId: item.id,
        amount: price,
      })),
      date: selectedDate.toISOString(),
    });

 /*   router.push('/expenses');*/
  };

  return (
    <>
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContainer}>
            <button
                type="button"
                className={styles.backBtn}
                onClick={() => router.back()}
            >
              ←
            </button>
            <h1 className={styles.pageTitle}>Новый расход</h1>
          </div>
        </div>

      </header>

      <div className={cn(styles.container, 'container')}>
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Дата</div>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Товар</div>
          <ItemSelector onItemSelect={handleItemSelect} />
        </div>

        {selectedItems.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Выбранные товары</div>
            <div className={styles.selectedList}>
              {selectedItems.map((selectedItem, index) => (
                <div key={index} className={styles.selectedCard}>
                  <div className={styles.selectedInfo}>
                    <div className={styles.selectedName}>
                      {selectedItem.item.name}
                    </div>
                    {selectedItem.item.category && (
                      <div className={styles.selectedCategory}>
                        {selectedItem.item.category.name}
                      </div>
                    )}
                  </div>
                  <div className={styles.selectedRight}>
                    <div className={styles.selectedPrice}>
                      {selectedItem.price}₽
                    </div>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(index)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              <div className={styles.totalCard}>
                <div className={styles.totalLabel}>Итого:</div>
                <div className={styles.totalAmount}>{totalAmount}₽</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContainer}>
          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={selectedItems.length === 0 || isCreating}
          >
            {isCreating ? 'Добавление...' : 'Добавить расход'}
          </button>
        </div>
      </div>

      {currentItem && (
        <PriceSelectionModal
          item={currentItem}
          isOpen={isPriceModalOpen}
          onClose={() => {
            setIsPriceModalOpen(false);
            setCurrentItem(null);
          }}
          onPriceSelect={handlePriceSelect}
        />
      )}
    </>
  );
}
