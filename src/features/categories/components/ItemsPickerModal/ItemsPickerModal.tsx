import styles from './ItemsPickerModal.module.scss';
import Modal from '@/shared/ui/Modal/Modal';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import FavoriteIcon from '/public/assets/svg/favorite.svg';
import { useState, useMemo } from 'react';
import { useItems } from '@/features/items/hooks/useItems';
import type { Item } from '@/lib/types/api.types';
import cn from 'classnames';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    selectedItemIds: string[];
    onSelect: (itemIds: string[]) => void;
};

export default function ItemsPickerModal({ isOpen, onClose, selectedItemIds, onSelect }: Props) {
    const [search, setSearch] = useState('');
    const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(selectedItemIds);
    const { items, isLoading } = useItems();

    const filteredItems = useMemo(() => {
        if (!search) return items;

        const lowerSearch = search.toLowerCase();
        return items.filter(item =>
            item.name.toLowerCase().includes(lowerSearch)
        );
    }, [items, search]);

    const favoriteItems = useMemo(() => {
        return filteredItems.filter(item => item.isFavorite);
    }, [filteredItems]);

    const regularItems = useMemo(() => {
        return filteredItems.filter(item => !item.isFavorite);
    }, [filteredItems]);

    const handleToggleItem = (itemId: string) => {
        setLocalSelectedIds(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleSubmit = () => {
        onSelect(localSelectedIds);
        onClose();
    };

    const handleClose = () => {
        setLocalSelectedIds(selectedItemIds);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Выбрать товары">
            <div className={styles.content}>
                <Input
                    type="search"
                    placeholder="Поиск товаров..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />

                {isLoading ? (
                    <div className={styles.loading}>Загрузка...</div>
                ) : (
                    <>
                        {favoriteItems.length > 0 && (
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>
                                    <FavoriteIcon className={styles.favoriteIcon} /> Избранное
                                </div>
                                <div className={styles.itemsList}>
                                    {favoriteItems.map(item => (
                                        <ItemCheckbox
                                            key={item.id}
                                            item={item}
                                            isSelected={localSelectedIds.includes(item.id)}
                                            onToggle={handleToggleItem}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {regularItems.length > 0 && (
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>Все товары</div>
                                <div className={styles.itemsList}>
                                    {regularItems.map(item => (
                                        <ItemCheckbox
                                            key={item.id}
                                            item={item}
                                            isSelected={localSelectedIds.includes(item.id)}
                                            onToggle={handleToggleItem}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {filteredItems.length === 0 && (
                            <div className={styles.empty}>
                                {search ? 'Товары не найдены' : 'Нет товаров'}
                            </div>
                        )}
                    </>
                )}

                <div className={styles.footer}>
                    <div className={styles.selectedCount}>
                        Выбрано: {localSelectedIds.length} товаров
                    </div>
                    <Button
                        variant="primary"
                        size="large"
                        onClick={handleSubmit}
                        className={styles.submitBtn}
                    >
                        Готово
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

type ItemCheckboxProps = {
    item: Item;
    isSelected: boolean;
    onToggle: (itemId: string) => void;
};

function ItemCheckbox({ item, isSelected, onToggle }: ItemCheckboxProps) {
    return (
        <label className={styles.itemCheckbox}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(item.id)}
                className={styles.checkbox}
            />
            <span className={styles.itemName}>{item.name}</span>
            {item.category && (
                <span className={styles.categoryBadge}>({item.category.name})</span>
            )}
        </label>
    );
}
