import styles from './DashboardPage.module.scss'
import Button from "@/shared/ui/Button/Button";
import StatsPanel from "@/features/dashboard/components/StatsPanel/StatsPanel";
import ProgressBar from "@/features/dashboard/components/ProgressBar/ProgressBar";
import TopCategories from "@/features/dashboard/components/TopCategories/TopCategories";
import cn from "classnames";

export default function DashboardPage() {
    return (
        <div className={'startPage'}>
            <div className="container">
                <div className={styles.content}>

                    <div className={styles.intro}>
                        <h1 className={styles.currentDate}>Октябрь 2025</h1>
                        <div className={cn(styles.text, 'mutedText')}>Отслеживай расходы легко и быстро</div>
                        <Button variant={'primary'} size={'large'} className={styles.actionBtn}>+ Добавить расход</Button>
                    </div>

                    <div className={styles.infoBlock}>
                        <StatsPanel/>
                        <ProgressBar/>
                        <TopCategories/>
                    </div>



                </div>
            </div>
        </div>
    );
}
