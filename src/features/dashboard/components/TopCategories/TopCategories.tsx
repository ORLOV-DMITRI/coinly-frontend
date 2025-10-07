import styles from './TopCategories.module.scss'
import Link from "next/link";
import Bar from "@/shared/ui/Bar/Bar";
import cn from "classnames";

export default function TopCategories() {
    return (
        <section>
            <div className={styles.header}>
                <h3>Топ категорий</h3>
                <Link href="/categories" className={styles.link}>Все категории →</Link>
            </div>

            <Link href={'/categories'} className={cn(styles.categories, 'card')}>
                <div className={styles.item}>
                    <div className={styles.info}>
                        <span className={styles.emoji}>🍞</span>
                        <span className={styles.name}>Продукты</span>
                    </div>

                    <div className={styles.barInfo}>
                        <Bar value={'80%'} className={styles.bar}/>
                        <span className={styles.amount}>8 240₽</span>
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.info}>
                        <span className={styles.emoji}>🚗</span>
                        <span className={styles.name}>Транспорт</span>
                    </div>

                    <div className={styles.barInfo}>
                        <Bar value={'45%'} className={styles.bar}/>
                        <span className={styles.amount}>4 680₽</span>
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.info}>
                        <span className={styles.emoji}>🏠</span>
                        <span className={styles.name}>Дом</span>
                    </div>

                    <div className={styles.barInfo}>
                        <Bar value={'25%'} className={styles.bar}/>
                        <span className={styles.amount}>2 500₽</span>
                    </div>
                </div>
            </Link>
        </section>
    );
}
