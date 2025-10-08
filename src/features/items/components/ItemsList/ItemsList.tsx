import styles from './ItemsList.module.scss';
import cn from 'classnames';
import FavoriteIcon from '/public/assets/svg/favorite.svg';
import ItemCardSkeleton from '@/features/items/components/ItemCardSkeleton/ItemCardSkeleton';
import type { Item } from '@/lib/types/api.types';
import { useMemo } from 'react';
import {useRouter} from "next/navigation";

type Props = {
    items: Item[];
    isLoading: boolean;
    search: string;
};

export default function ItemsList({ items, isLoading, search }: Props) {
    const router = useRouter()
    const filteredItems = useMemo(() => {
        if (!search) return items;

        const lowerSearch = search.toLowerCase();
        return items.filter(item =>
            item.name.toLowerCase().includes(lowerSearch)
        );
    }, [items, search]);

    const handleLinkEdit = (itemId: string) => {
        router.push(`/items/edit/${itemId}`);
    }

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
                <div className={cn(styles.card, 'card')} key={item.id} onClick={() => handleLinkEdit(item.id)}>
                    <div className={styles.header}>
                        <div>
                            <div className={styles.name}>{item.name}</div>
                        </div>
                        <div className={cn(styles.favorite, item.isFavorite && styles.active)}>
                            <FavoriteIcon />
                        </div>
                    </div>
                    <div className={styles.prices}>
                        {item.prices.map((price, index) => (
                            <span className={styles.price} key={index}>{price}₽</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
