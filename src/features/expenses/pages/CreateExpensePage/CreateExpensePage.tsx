'use client';

import styles from './CreateExpensePage.module.scss';
import cn from 'classnames';
import {FormEvent, useState} from 'react';
import { useRouter } from 'next/navigation';
import DateSelector from '../../components/DateSelector/DateSelector';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import PriceSelectionModal from '../../components/PriceSelectionModal/PriceSelectionModal';
import CreateItemModal from '../../components/CreateItemModal/CreateItemModal';
import { useExpenses } from '../../hooks/useExpenses';
import type { Item } from '@/lib/types/api.types';
import BackIcon from '/public/assets/svg/backArrow.svg';
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import Button from "@/shared/ui/Button/Button";
import ActionButtons from "@/shared/ui/ActionButtons/ActionButtons";

type SelectedItem = {
  item: Item;
  price: number;
  quantity: number;
};

export default function CreateExpensePage() {
  const router = useRouter();
  const { createExpense, isCreating } = useExpenses();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);

  const handleItemSelect = (item: Item) => {
    setCurrentItem(item);
    setIsPriceModalOpen(true);
  };

  const handlePriceSelect = (price: number, quantity: number) => {
    if (currentItem) {
      setSelectedItems(prev => [...prev, { item: currentItem, price, quantity }]);
      setCurrentItem(null);
    }
  };

  const handleRemoveItem = (currentIndex: number) => {
    setSelectedItems(prev => prev.filter((item, index) => index !== currentIndex));
  };

  const handleItemCreated = (newItem: Item) => {
    setIsCreateItemModalOpen(false);
    // Сразу открываем PriceSelectionModal для нового товара
    setCurrentItem(newItem);
    setIsPriceModalOpen(true);
  };

  const totalAmount = selectedItems.reduce((sum, { price, quantity }) => sum + (price * quantity), 0);
  const selectedItemIds = selectedItems.map(({ item }) => item.id);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;
    createExpense({
      items: selectedItems.map(({ item, price }) => ({
        itemId: item.id,
        amount: price,
      })),
      date: selectedDate.toISOString(),
    });

    router.push('/expenses');
  };

  return (
    <div className={'page'}>
      <PageHeader title={'Новый расход'} actionType={'back'}/>

      <div className={cn(styles.container, 'container')}>
        <form onSubmit={handleSubmit} className={styles.section}>
          <div className={styles.sectionTitle}>Дата</div>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </form>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Товар</div>
          <ItemSelector
            onItemSelect={handleItemSelect}
            onCreateItem={() => setIsCreateItemModalOpen(true)}
            selectedItemIds={selectedItemIds}
          />
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
                      {selectedItem.quantity > 1 && (
                        <span className={styles.quantityBadge}> ×{selectedItem.quantity}</span>
                      )}
                    </div>
                    {selectedItem.item.category && (
                      <div className={styles.selectedCategory}>
                        {selectedItem.item.category.name}
                      </div>
                    )}
                  </div>
                  <div className={styles.selectedRight}>
                    <div className={styles.selectedPrice}>
                      {selectedItem.price * selectedItem.quantity}₽
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

        <ActionButtons isDisabled={isCreating} submitLabel={'Создать'}/>
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

      <CreateItemModal
        isOpen={isCreateItemModalOpen}
        onClose={() => setIsCreateItemModalOpen(false)}
        onItemCreated={handleItemCreated}
      />
    </div>
  );
}
