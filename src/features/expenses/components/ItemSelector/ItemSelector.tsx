'use client';

import styles from './ItemSelector.module.scss';
import cn from 'classnames';
import { useState, useMemo } from 'react';
import { useItems } from '@/features/items/hooks/useItems';
import type { Item } from '@/lib/types/api.types';

type Props = {
  onItemSelect: (item: Item) => void;
  onCreateItem?: () => void;
  className?: string;
};

export default function ItemSelector({ onItemSelect, onCreateItem, className }: Props) {
  const [search, setSearch] = useState('');
  const { items, isLoading } = useItems();

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
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск товара..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
      </div>

      {isLoading ? (
        <div className={styles.loading}>Загрузка товаров...</div>
      ) : (
        <>
          {favoriteItems.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>
                👑 Избранное
              </div>
              <div className={styles.itemsList}>
                {favoriteItems.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.itemCard}
                    onClick={() => onItemSelect(item)}
                  >
                    <div>
                      <div className={styles.itemName}>{item.name}</div>
                      {item.category && (
                        <div className={styles.itemCategory}>
                          {item.category.name}
                        </div>
                      )}
                    </div>
                    <div className={styles.itemArrow}>→</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {regularItems.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>
                Все товары
              </div>
              <div className={styles.itemsList}>
                {regularItems.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.itemCard}
                    onClick={() => onItemSelect(item)}
                  >
                    <div>
                      <div className={styles.itemName}>{item.name}</div>
                      {item.category && (
                        <div className={styles.itemCategory}>
                          {item.category.name}
                        </div>
                      )}
                    </div>
                    <div className={styles.itemArrow}>→</div>
                  </button>
                ))}
              </div>
            </div>
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
