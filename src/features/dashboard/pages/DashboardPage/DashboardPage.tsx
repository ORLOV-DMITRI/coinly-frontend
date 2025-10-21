'use client'
import { useState } from 'react';
import styles from './DashboardPage.module.scss'
import Button from "@/shared/ui/Button/Button";
import ProgressBar from "@/features/dashboard/components/ProgressBar/ProgressBar";
import FilterableStats from "@/features/dashboard/components/FilterableStats/FilterableStats";
import SetBudgetModal from "@/features/dashboard/components/SetBudgetModal/SetBudgetModal";
import cn from "classnames";
import {useStats} from "@/features/dashboard/hooks/useStats";
import Link from "next/link";
import PlusIcon from '/public/assets/svg/plus.svg'
import { useAuth } from '@/lib/auth/authContext';
import { getCurrentFinancialMonth, getFinancialMonthLabel } from '@/shared/utils/financialMonth';


export default function DashboardPage() {
    const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
    const { user } = useAuth();

    const monthStartDay = user?.monthStartDay || 1;
    const currentMonth = getCurrentFinancialMonth(monthStartDay);
    const monthLabel = getFinancialMonthLabel(currentMonth, monthStartDay);

    const { data: stats } = useStats({ month: currentMonth });
    const currentSpent = stats?.total || 0;

    const openBudgetModal = () => setIsBudgetModalOpen(true);
    const closeBudgetModal = () => setIsBudgetModalOpen(false);

    return (
        <div className={'startPage'}>
            <div className="container">
                <div className={styles.content}>

                    <div className={styles.intro}>
                        <div className={styles.currentDate}>{monthLabel}</div>
                        <div className={cn(styles.text, 'mutedText')}>Отслеживай расходы легко и быстро</div>
                        <Link href={'/expenses/create'}>
                            <Button variant={'primary'} size={'large'} className={styles.actionBtn}>
                                <span className={styles.btnIcon}><PlusIcon/></span>
                                <span>Добавить расход</span>
                            </Button>
                        </Link>

                    </div>

                    <div className={styles.infoBlock}>
                        <ProgressBar
                          currentSpent={currentSpent}
                          month={currentMonth}
                          onSetBudget={openBudgetModal}
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
