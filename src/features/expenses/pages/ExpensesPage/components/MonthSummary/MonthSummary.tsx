'use client';

import styles from './MonthSummary.module.scss';
import {useMemo} from "react";
import {PeriodType} from "@/features/expenses/pages/ExpensesPage/components/PeriodSelector/PeriodSelector";

type Props = {
    period: PeriodType;
    total: number;
};

export default function MonthSummary({period, total}: Props) {

    const periodLabel = useMemo(() => {
        const now = new Date();
        const monthNames = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        switch (period) {
            case 'week':
                return 'Неделя';
            case 'month':
                return `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
            case 'year':
                return `${now.getFullYear()}`;
        }
    }, [period]);

    return (
        <div className={styles.summary}>
            <div className={styles.row}>
                <span className={styles.label}>{periodLabel}</span>
                <span className={styles.amount}>{total.toLocaleString('ru-RU')}₽</span>
            </div>
        </div>
    );
}
