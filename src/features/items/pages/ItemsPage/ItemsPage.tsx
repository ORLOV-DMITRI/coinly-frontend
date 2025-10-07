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
    const { items, isLoading } = useItems();

    return (
        <section className={styles.itemsPage}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2>Товары</h2>
                        <Link href={'/items/create'}>
                            <Button variant={'primary'} size={'default'} className={styles.addBtn}>
                                Создать товар
                            </Button>
                        </Link>
                    </div>

                    <SearchSection
                        search={search}
                        onSearchChange={setSearch}
                        itemsCount={items.length}
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
