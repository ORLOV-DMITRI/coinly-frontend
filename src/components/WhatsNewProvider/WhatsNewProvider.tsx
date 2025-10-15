'use client';

import { useWhatsNew } from '@/lib/hooks/useWhatsNew';
import WhatsNewModal from '@/features/updates/components/WhatsNewModal/WhatsNewModal';

export default function WhatsNewProvider() {
  const { showModal, latestUpdate, closeModal } = useWhatsNew();

  if (!latestUpdate) return null;

  return (
    <WhatsNewModal
      isOpen={showModal}
      onClose={closeModal}
      update={latestUpdate}
    />
  );
}