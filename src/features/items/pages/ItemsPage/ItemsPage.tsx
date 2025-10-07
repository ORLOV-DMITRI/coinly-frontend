import styles from './ItemsPage.module.scss'
import Button from "@/shared/ui/Button/Button";
import SearchSection from "@/features/items/components/SearchSection/SearchSection";
import ItemsList from "@/features/items/components/ItemsList/ItemsList";

export default function ItemsPage() {
    return (
        <section className={styles.itemsPage}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2>Товары</h2>
                        <Button variant={'primary'} size={'default'} className={styles.addBtn}>
                            Создать товар
                        </Button>
                    </div>


                    <SearchSection/>

                    <ItemsList/>

                </div>
            </div>
        </section>
    );
}
