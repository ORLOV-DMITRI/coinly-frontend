import styles from './CategoriesPage.module.scss'
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";
import SearchSection from "@/features/categories/components/SearchSection/SearchSection";
import {useState} from "react";
import {useItems} from "@/features/items/hooks/useItems";
import {useCategories} from "@/features/categories/hooks/useCategories";
import CategoriesList from "@/features/categories/components/CategoriesList/CategoriesList";

export default function CategoriesPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'count'>('all');

    const { categories, isLoading } = useCategories();

    return (
        <section className={styles.categoriesPage}>
          <div className="container">
            <div className={styles.content}>
              <div className={styles.header}>
                <h2>Категории</h2>
                <Link href={'/categories/create'}>
                  <Button variant={'primary'} size={'default'} className={styles.addBtn}>
                    Создать
                  </Button>
                </Link>
              </div>

                <SearchSection
                    search={search}
                    onSearchChange={setSearch}
                    itemsCount={categories.length}
                    filter={filter}
                    onFilterChange={setFilter}
                />

                <CategoriesList categories={categories} filter={filter} search={search} isLoading={isLoading}/>

            </div>
          </div>
        </section>
    );
}
