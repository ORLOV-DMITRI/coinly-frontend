import styles from './LandingPage.module.scss'
import cn from "classnames";
import Button from "@/shared/ui/Button/Button";
import Link from "next/link";

export default function LandingPage() {
    return (
        <section className={cn(styles.page, 'page')}>
            <div className="container">

                <div className={styles.helloBlock}>

                    <h1>Отслеживай расходы легко и быстро</h1>
                    <p className={styles.subtitle}>Контролируй свою жизнь</p>

                        <Link href={'/login'}>
                            <Button variant={'primary'} size={'default'}>Начать</Button>
                        </Link>

                </div>
                <div className={styles.decorBlocks}>
                    <div className={styles.decorBlock}></div>
                    <div className={styles.decorBlock}></div>
                    <div className={styles.decorBlock}></div>
                </div>

            </div>
        </section>
    );
}
