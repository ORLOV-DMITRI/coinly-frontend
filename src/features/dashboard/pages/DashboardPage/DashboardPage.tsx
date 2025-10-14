'use client'
import { useState } from 'react';
import styles from './DashboardPage.module.scss'
import Button from "@/shared/ui/Button/Button";
import ProgressBar from "@/features/dashboard/components/ProgressBar/ProgressBar";
import FilterableStats from "@/features/dashboard/components/FilterableStats/FilterableStats";
import SetBudgetModal from "@/features/dashboard/components/SetBudgetModal/SetBudgetModal";
import cn from "classnames";

type Props = {
    isAuthenticated: boolean;
}
export default function DashboardPage({isAuthenticated}:Props) {
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

    const currentSpent = 15420;

    const getCurrentMonth = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    };

    const currentMonth = getCurrentMonth();

    const openBudgetModal = () => setIsBudgetModalOpen(true);
    const closeBudgetModal = () => setIsBudgetModalOpen(false);

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
                        <ProgressBar
                          currentSpent={currentSpent}
                          month={currentMonth}
                          onSetBudget={openBudgetModal}
                          isAuthenticated={isAuthenticated}
                        />
                        <FilterableStats />
                    </div>

                </div>
            </div>

            <SetBudgetModal
              isOpen={isBudgetModalOpen}
              onClose={closeBudgetModal}
            />
        </div>
    );
}
