'use client';

import styles from './CreateExpensePage.module.scss';
import cn from 'classnames';
import {FormEvent, useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import DateSelector from '../../components/DateSelector/DateSelector';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import PriceSelectionModal from '../../components/PriceSelectionModal/PriceSelectionModal';
import CreateItemModal from '../../components/CreateItemModal/CreateItemModal';
import SelectedItemsList from '../../components/SelectedItemsList/SelectedItemsList';
import SelectedItemsAside from '../../components/SelectedItemsAside/SelectedItemsAside';
import { useExpenses } from '../../hooks/useExpenses';
import { useAsideVisibility } from '../../hooks/useAsideVisibility';
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
  const { shouldShowAside, selectedItemsRef, updateItemsPresence } = useAsideVisibility();

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

  const handleQuantityChange = (currentIndex: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedItems(prev =>
      prev.map((item, index) =>
        index === currentIndex ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleItemCreated = (newItem: Item) => {
    setIsCreateItemModalOpen(false);
    setCurrentItem(newItem);
    if(newItem) {
      setSelectedItems(prev => [...prev, { item: newItem, price: newItem.prices[0], quantity: 1 }]);
      setCurrentItem(null);
    }

  };

  const totalAmount = selectedItems.reduce((sum, { price, quantity }) => sum + (price * quantity), 0);
  const selectedItemIds = selectedItems.map(({ item }) => item.id);

  useEffect(() => {
    updateItemsPresence(selectedItems.length);
  }, [selectedItems.length, updateItemsPresence]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;
    createExpense({
      items: selectedItems.map(({ item, price, quantity }) => ({
        itemId: item.id,
        amount: price,
        quantity,
      })),
      date: selectedDate.toISOString(),
    });

    router.push('/expenses');
  };

  return (
    <div className={'page'}>
      <PageHeader title={'Новый расход'} actionType={'back'} isLoading={isCreating}/>

      <form onSubmit={handleSubmit} className={cn(styles.container, 'container')}>
        <div  className={styles.section}>
          <div className={styles.sectionTitle}>Дата</div>
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Товар</div>
          <ItemSelector
            onItemSelect={handleItemSelect}
            onCreateItem={() => setIsCreateItemModalOpen(true)}
            selectedItemIds={selectedItemIds}
          />
        </div>

        {selectedItems.length > 0 && (
          <div className={styles.section} ref={selectedItemsRef}>
            <div className={styles.sectionTitle}>Выбранные товары</div>
            <SelectedItemsList
              selectedItems={selectedItems}
              totalAmount={totalAmount}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        )}

        <ActionButtons isDisabled={isCreating} submitLabel={'Создать'} isSubmitLabel={'Создание'}/>
      </form>

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

      <SelectedItemsAside
        selectedItems={selectedItems}
        totalAmount={totalAmount}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        isVisible={shouldShowAside}
      />
    </div>
  );
}
