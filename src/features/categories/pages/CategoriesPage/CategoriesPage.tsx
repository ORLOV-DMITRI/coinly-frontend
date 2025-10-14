import styles from './CategoriesPage.module.scss'
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";
import SearchSection from "@/features/categories/components/SearchSection/SearchSection";
import {useState} from "react";
import {useItems} from "@/features/items/hooks/useItems";
import {useCategories} from "@/features/categories/hooks/useCategories";
import CategoriesList from "@/features/categories/components/CategoriesList/CategoriesList";
import PeriodSelector from "@/features/expenses/pages/ExpensesPage/components/PeriodSelector/PeriodSelector";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";

export default function CategoriesPage() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'count'>('all');

    const { categories, isLoading } = useCategories();

    return (
        <section className={styles.categoriesPage}>
            <PageHeader title={'Категории'} actionType={'link'} link={'/categories/create'}/>
          <div className="container">
            <div className={styles.content}>
                <Link href={'/categories/create'} className={styles.mobile}>
                    <Button variant={'primary'} size={'default'} className={styles.addBtn}>
                        Создать
                    </Button>
                </Link>
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
