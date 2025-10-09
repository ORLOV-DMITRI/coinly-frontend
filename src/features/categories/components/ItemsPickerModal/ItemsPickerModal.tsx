import styles from './ItemsPickerModal.module.scss';
import Modal from '@/shared/ui/Modal/Modal';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import FavoriteIcon from '/public/assets/svg/favorite.svg';
import {useEffect, useMemo, useState} from 'react';
import {useItems} from '@/features/items/hooks/useItems';
import type {Item} from '@/lib/types/api.types';
import {pluralize} from "@/shared/utils/pluralize";
import CategoryItemCheckbox from "@/features/categories/components/CategoryItemCheckbox/CategoryItemCheckbox";
import {ShowConfirmOptions} from "@/shared/ui/ConfirmDialog/useConfirmDialog";
import SearchInput from "@/shared/ui/SearchInput/SearchInput";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    selectedItemIds: string[];
    onSelect: (itemIds: string[]) => void;
    showConfirm?: (options: ShowConfirmOptions) => Promise<boolean>
};

export default function ItemsPickerModal({isOpen, onClose, selectedItemIds, onSelect, showConfirm}: Props) {
    const [search, setSearch] = useState('');
    const [localSelectedIds, setLocalSelectedIds] = useState<string[]>(selectedItemIds);


    useEffect(() => {
        setLocalSelectedIds(selectedItemIds)
    }, [selectedItemIds]);

    const {items, isLoading} = useItems();

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


    const handleToggleItem = async (item: Item) => {
        console.log(item)
        if (item.category === null) {
            setLocalSelectedIds(prev => {
                if (prev.includes(item.id)) {
                    return prev.filter(id => id !== item.id);
                } else {
                    return [...prev, item.id];
                }
            });
        }else {
            if(!showConfirm) return;



            const confirmed = await showConfirm({
                title: 'Перенос товара',
                message: `Товар <span>"${item.name}"</span> уже находится в категории <br/> <span>"${item.category.name}"</span>. Перенести ?`,
                confirmText: 'Да',
                cancelText: 'Нет'
            });

            if (!confirmed) return;

            setLocalSelectedIds(prev => {
                if (prev.includes(item.id)) {
                    return prev.filter(id => id !== item.id);
                } else {
                    return [...prev, item.id];
                }
            });

        }

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
                <SearchInput search={search} handleSearch={(value) => setSearch(value)} placeholder={'Поиск товаров...'}/>
                

                {isLoading ? (
                    <div className={styles.loading}>Загрузка...</div>
                ) : (
                    <>
                        {favoriteItems.length > 0 && (
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>
                                    <FavoriteIcon className={styles.favoriteIcon}/> Избранное
                                </div>
                                <div className={styles.itemsList}>
                                    {favoriteItems.map(item => (
                                        <CategoryItemCheckbox
                                            key={item.id}
                                            item={item}
                                            isSelected={localSelectedIds.includes(item.id)}
                                            onToggle={() => handleToggleItem(item)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {regularItems.length > 0 && (
                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>Все товары</div>
                                <div className={styles.itemsList}>
                                    {regularItems.map(item => {
                                        return (
                                            <CategoryItemCheckbox
                                                key={item.id}
                                                item={item}
                                                isSelected={localSelectedIds.includes(item.id)}
                                                onToggle={() => handleToggleItem(item)}
                                            />
                                        )
                                    })}
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
                        Выбрано: {pluralize(localSelectedIds.length, ['товар', 'товара', 'товаров'])}
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


