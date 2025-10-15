'use client';

import { useState, useEffect } from 'react';
import { UPDATES } from '@/data/updates';
import { hasNewUpdates, markAllUpdatesAsSeen } from '@/lib/utils/whatsNew';

export const useWhatsNew = () => {
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  const latestUpdate = UPDATES[0];

  useEffect(() => {
    setMounted(true);

    if (latestUpdate && hasNewUpdates(latestUpdate.date)) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [latestUpdate]);

  const closeModal = () => {
    setShowModal(false);
    if (latestUpdate) {
      markAllUpdatesAsSeen(latestUpdate.date);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  return {
    showModal: mounted && showModal,
    latestUpdate,
    closeModal,
    openModal,
    hasNewUpdates: mounted && latestUpdate ? hasNewUpdates(latestUpdate.date) : false
  };
};