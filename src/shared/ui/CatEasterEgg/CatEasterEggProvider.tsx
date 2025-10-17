'use client';

import { useState } from 'react';
import { useClickCounter } from '@/lib/hooks/useClickCounter';
import CatNotification from './CatNotification';
import CatModal from './CatModal';

export default function CatEasterEggProvider() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { showNotification, resetNotification } = useClickCounter(5);

    const handleNotificationClick = () => {
        setIsModalOpen(true);
        resetNotification();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleAutoHide = () => {
        resetNotification();
    };

    return (
        <>
            <CatNotification
                isVisible={showNotification}
                onNotificationClick={handleNotificationClick}
                onAutoHide={handleAutoHide}
            />
            <CatModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </>
    );
}
