import styles from './ProgressBar.module.scss'
import Bar from "@/shared/ui/Bar/Bar";

export default function ProgressBar() {
    return (
        <section className={styles.progress}>
          <div className={styles.header}>
            <h3>Бюджет на месяц</h3>
            <div className={styles.amount}>15 420₽ / 30 000₽</div>
          </div>
            <Bar value={'51%'}/>
        </section>
    );
}
