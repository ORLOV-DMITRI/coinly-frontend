import { useEffect, useState, useCallback } from 'react';

type UseClickCounterReturn = {
    showNotification: boolean;
    resetNotification: () => void;
};

export function useClickCounter(triggerCount: number = 5): UseClickCounterReturn {
    const [clickCount, setClickCount] = useState(0);
    const [showNotification, setShowNotification] = useState(false);

    const handleClick = useCallback(() => {
        setClickCount((prev) => {
            const newCount = prev + 1;

            if (newCount >= triggerCount) {
                setShowNotification(true);
                return 0; // Сбрасываем счётчик
            }

            return newCount;
        });
    }, [triggerCount]);

    const resetNotification = useCallback(() => {
        setShowNotification(false);
    }, []);

    useEffect(() => {
        // Слушаем все клики в приложении
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    return {
        showNotification,
        resetNotification,
    };
}
