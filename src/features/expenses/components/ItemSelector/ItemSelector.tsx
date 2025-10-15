import styles from './ItemSelector.module.scss';
import cn from 'classnames';
import { useState, useMemo } from 'react';
import { useItems } from '@/features/items/hooks/useItems';
import type { Item } from '@/lib/types/api.types';
import ItemSelectorList from "@/features/expenses/components/ItemSelectorList/ItemSelectorList";
import SearchInput from "@/shared/ui/SearchInput/SearchInput";
import SkeletonLoading from "@/shared/ui/SkeletonLoading/SkeletonLoading";

type Props = {
  onItemSelect: (item: Item) => void;
  onCreateItem?: () => void;
  selectedItemIds?: string[];
  className?: string;
  clearSearchAfterSelect?: boolean;
};

export default function ItemSelector({ onItemSelect, onCreateItem, selectedItemIds = [], className, clearSearchAfterSelect = true }: Props) {
  const [search, setSearch] = useState('');
  const { items, isLoading } = useItems();

  const isItemSelected = (itemId: string) => selectedItemIds.includes(itemId);

  const handleItemSelect = (item: Item) => {
    onItemSelect(item);
    if (clearSearchAfterSelect) {
      setSearch('');
    }
  };

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const searchLower = search.toLowerCase().trim();
    return items
      .filter(item => item.name.toLowerCase().includes(searchLower))
      .slice(0, 5);
  }, [items, search]);

  const favoriteItems = useMemo(() => {
    return items.filter(item => item.isFavorite);
  }, [items]);

  // Все товары (временно скрыто)
  // const regularItems = useMemo(() => {
  //   return items.filter(item => !item.isFavorite);
  // }, [items]);

  return (
    <div className={cn(styles.wrapper, className)}>

      <SearchInput search={search} handleSearch={(value) => setSearch(value)} placeholder={'Поиск товара...'}/>

      {isLoading && (
          <div className={styles.itemsList}>
            <SkeletonLoading variant={'blockName'} count={4}/>
          </div>
      )}

      {!isLoading && (
          <>
            {search.trim() && (
              <div className={styles.searchSection}>
                {searchResults.length > 0 ? (
                  <ItemSelectorList
                    items={searchResults}
                    isItemSelected={isItemSelected}
                    onItemSelect={handleItemSelect}
                    label={'Результаты поиска'}
                  />
                ) : (
                  <div className={styles.empty}>
                    Товары не найдены
                  </div>
                )}
              </div>
            )}

            {favoriteItems.length > 0 && (
                <ItemSelectorList
                  items={favoriteItems}
                  isItemSelected={isItemSelected}
                  onItemSelect={handleItemSelect}
                  label={'Избранное'}
                />
            )}

            {/* Все товары - временно скрыто */}
            {/* {regularItems.length > 0 && (
                <ItemSelectorList items={regularItems} isItemSelected={isItemSelected} onItemSelect={onItemSelect} label={'Все товары'}/>
            )} */}

            {favoriteItems.length === 0 && !search.trim() && (
                <div className={styles.empty}>
                  Нет товаров
                </div>
            )}

            {onCreateItem && (
                <button type="button" className={styles.createBtn} onClick={onCreateItem}>
                  <span className={styles.createIcon}>+</span>
                  <span>Создать новый товар</span>
                </button>
            )}
          </>
      )}
    </div>
  );
}
