import styles from './ItemsList.module.scss';
import cn from 'classnames';
import FavoriteIcon from '/public/assets/svg/favorite.svg';
import DeleteIcon from '/public/assets/svg/delete.svg'

import ItemCardSkeleton from '@/features/items/components/ItemCardSkeleton/ItemCardSkeleton';
import type { Item } from '@/lib/types/api.types';
import { useMemo } from 'react';
import {useRouter} from "next/navigation";
import { useItems } from '@/features/items/hooks/useItems';
import ConfirmDialog from "@/shared/ui/ConfirmDialog/ConfirmDialog";
import {useConfirmDialog} from "@/shared/ui/ConfirmDialog/useConfirmDialog";

type Props = {
    items: Item[];
    isLoading: boolean;
    search: string;
};

export default function ItemsList({ items, isLoading, search }: Props) {
    const router = useRouter();
    const { updateItem, deleteItem } = useItems();

    const { dialogState, showConfirm } = useConfirmDialog();


    const filteredItems = useMemo(() => {
        if (!search) return items;

        const lowerSearch = search.toLowerCase();

        return items.filter(item =>
            item.name.toLowerCase().includes(lowerSearch)
        );

    }, [items, search]);

    const handleLinkEdit = (itemId: string) => {
        router.push(`/items/edit/${itemId}`);
    };

    const handleToggleFavorite = (e: React.MouseEvent, item: Item) => {
        e.stopPropagation();
        updateItem({
            id: item.id,
            data: {
                name: item.name,
                prices: item.prices,
                categoryId: item.categoryId,
                isFavorite: !item.isFavorite,
            },
        });
    };

    const handleDelete = async (e: React.MouseEvent, itemId: string, name: string) => {
        e.stopPropagation()
        const confirmed = await showConfirm({
            title: 'Удалить товар',
            message: `Вы действительно хотите удалить товар <span>"${name}"</span>? <br/> Это действие нельзя отменить.`
        });

        if (!confirmed) return;

        try {
            deleteItem(itemId);
        } catch (error) {
            console.error('Ошибка удаления товара:', error);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.itemsList}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <ItemCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (filteredItems.length === 0) {
        return (
            <div className={styles.empty}>
                {search ? 'Товары не найдены' : 'Нет товаров'}
            </div>
        );
    }

    return (
        <div className={styles.itemsList}>
            {filteredItems.map((item) => (
                <div className={cn(styles.card, 'card')} key={item.id} onClick={() => handleLinkEdit(item.id)} title={'Нажмите для редактирования'}>
                    <div className={styles.header}>
                        <div className={styles.name}>
                            {item.name}
                        </div>
                        <button
                            type="button"
                            className={cn(styles.favorite, item.isFavorite && styles.active)}
                            onClick={(e) => handleToggleFavorite(e, item)}
                        >
                            <FavoriteIcon />
                        </button>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.prices}>
                            {item.prices.map((price, index) => (
                                <span className={styles.price} key={index}>{price}₽</span>
                            ))}
                        </div>
                        <button
                            type="button"
                            className={styles.deleteBtn}
                            onClick={(e) => handleDelete(e, item.id, item.name)}
                        >
                            <DeleteIcon/>
                        </button>
                    </div>

                </div>
            ))}


            <ConfirmDialog
                isOpen={dialogState.isOpen}
                title={dialogState.title}
                message={dialogState.message}
                confirmText={dialogState.confirmText}
                cancelText={dialogState.cancelText}
                onConfirm={dialogState.onConfirm}
                onCancel={dialogState.onCancel}
            />
        </div>
    );
}
