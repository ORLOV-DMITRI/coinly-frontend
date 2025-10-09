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
};

export default function ItemSelector({ onItemSelect, onCreateItem, selectedItemIds = [], className }: Props) {
  const [search, setSearch] = useState('');
  const { items, isLoading } = useItems();

  const isItemSelected = (itemId: string) => selectedItemIds.includes(itemId);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const searchLower = search.toLowerCase().trim();
    return items.filter(item =>
      item.name.toLowerCase().includes(searchLower)
    );
  }, [items, search]);

  const favoriteItems = useMemo(() => {
    return filteredItems.filter(item => item.isFavorite);
  }, [filteredItems]);

  const regularItems = useMemo(() => {
    return filteredItems.filter(item => !item.isFavorite);
  }, [filteredItems]);

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
            {favoriteItems.length > 0 && (
                <ItemSelectorList items={favoriteItems} isItemSelected={isItemSelected} onItemSelect={onItemSelect} label={'Избранное'}/>
            )}

            {regularItems.length > 0 && (
                <ItemSelectorList items={regularItems} isItemSelected={isItemSelected} onItemSelect={onItemSelect} label={'Все товары'}/>
            )}

            {filteredItems.length === 0 && !isLoading && (
                <div className={styles.empty}>
                  {search ? 'Товары не найдены' : 'Нет товаров'}
                </div>
            )}

            {onCreateItem && (
                <button
                    type="button"
                    className={styles.createBtn}
                    onClick={onCreateItem}
                >
                  <span className={styles.createIcon}>+</span>
                  <span>Создать новый товар</span>
                </button>
            )}
          </>
      )}
    </div>
  );
}
