'use client';

import styles from './ItemsPage.module.scss';
import Button from '@/shared/ui/Button/Button';
import SearchSection from '@/features/items/components/SearchSection/SearchSection';
import ItemsList from '@/features/items/components/ItemsList/ItemsList';
import Link from 'next/link';
import { useState } from 'react';
import { useItems } from '@/features/items/hooks/useItems';

export default function ItemsPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'favorite'>('all');

    const { items, isLoading } = useItems({
        isFavorite: filter === 'favorite' ? true : undefined
    });

    return (
        <section className={styles.itemsPage}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2>Товары</h2>
                        <Link href={'/items/create'}>
                            <Button variant={'primary'} size={'default'} className={styles.addBtn}>
                                Создать
                            </Button>
                        </Link>
                    </div>

                    <Link href={'/items/create'} className={styles.mobile}>
                        <Button variant={'primary'} size={'default'} className={styles.addBtn}>
                            Создать
                        </Button>
                    </Link>
                    <SearchSection
                        search={search}
                        onSearchChange={setSearch}
                        itemsCount={items.length}
                        filter={filter}
                        onFilterChange={setFilter}
                    />

                    <ItemsList
                        items={items}
                        isLoading={isLoading}
                        search={search}
                    />
                </div>
            </div>
        </section>
    );
}
