import styles from './CategoriesList.module.scss'
import type { CategoryWithCount } from '@/lib/types/api.types';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { pluralize } from '@/shared/utils/pluralize';
import cn from "classnames";
import SkeletonLoading from "@/shared/ui/SkeletonLoading/SkeletonLoading";

type Props = {
    categories: CategoryWithCount[];
    isLoading: boolean;
    search: string;
    filter: 'all' | 'count';
};

export default function CategoriesList({ categories, isLoading, search, filter }: Props) {
    const router = useRouter();

    const filteredAndSortedCategories = useMemo(() => {
        let result = categories;

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(category =>
                category.name.toLowerCase().includes(lowerSearch)
            );
        }

        if (filter === 'count') {
            result = [...result].sort((a, b) => b._count.items - a._count.items);
        }

        return result;
    }, [categories, search, filter]);

    const handleCategoryClick = (categoryId: string) => {
        router.push(`/categories/edit/${categoryId}`);
    };

    if (isLoading) {
        return (
            <div className={styles.categoriesList}>
                <SkeletonLoading variant={'category'} count={4}/>
            </div>
        );
    }

    if (filteredAndSortedCategories.length === 0) {
        return (
            <div className={styles.empty}>
                {search ? 'Категории не найдены' : 'Нет категорий'}
            </div>
        );
    }

    return (
        <div className={cn(styles.categoriesList)}>
            {filteredAndSortedCategories.map((category) => (
                <div
                    className={styles.row}
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    title={'Нажмите для редактирования'}
                >
                    <div className={styles.emoji}>{category.emoji || '📁'}</div>
                    <div className={styles.info}>
                        <div className={styles.name}>{category.name}</div>
                        <div className={styles.count}>
                            {pluralize(category._count.items, ['товар', 'товара', 'товаров'])}
                        </div>
                    </div>
                    <div className={styles.arrow}>→</div>
                </div>
            ))}
        </div>
    );
}
