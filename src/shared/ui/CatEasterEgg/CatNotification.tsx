import styles from './CatNotification.module.scss';
import { useEffect } from 'react';

type Props = {
    isVisible: boolean;
    onNotificationClick: () => void;
    onAutoHide: () => void;
};

export default function CatNotification({ isVisible, onNotificationClick, onAutoHide }: Props) {
    useEffect(() => {
        if (isVisible) {
            // Автоматически скрываем через 5 секунд
            const timer = setTimeout(() => {
                onAutoHide();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onAutoHide]);

    if (!isVisible) return null;

    return (
        <div
            className={styles.notification}
            onClick={onNotificationClick}
        >
            <span className={styles.emoji}>🐱</span>
            <span className={styles.text}>Попучники следят за вами</span>
            <span className={styles.smile}>😄</span>
        </div>
    );
}
