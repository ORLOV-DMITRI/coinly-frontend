import styles from './CategoriesList.module.scss'

export default function CategoriesList() {
    return (
        <div className={styles.categoriesList}>
            <div className={styles.row}>
                <div className={styles.emoji}>🍞</div>
                <div className={styles.info}>
                    <div className={styles.name}>Продукты</div>
                    <div className={styles.count}>12 товаров</div>
                </div>
                <div className={styles.arrow}>→</div>
            </div>

        </div>
    );
}
