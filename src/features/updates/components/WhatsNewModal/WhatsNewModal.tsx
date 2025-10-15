'use client';

import styles from './WhatsNewModal.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import Modal from '@/shared/ui/Modal/Modal';
import Button from '@/shared/ui/Button/Button';
import { UpdateEntry, getCategoryColor, getCategoryLabel } from '@/data/updates';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  update: UpdateEntry;
};

export default function WhatsNewModal({ isOpen, onClose, update }: Props) {
  const router = useRouter();

  const handleViewAll = () => {
    onClose();
    router.push('/updates');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Что нового в Coinly"
      className={styles.modal}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.dateAndCategory}>
            <time className={styles.date}>{formatDate(update.date)}</time>
            <span
              className={styles.categoryBadge}
              style={{ backgroundColor: getCategoryColor(update.category) }}
            >
              {getCategoryLabel(update.category)}
            </span>
          </div>
          <h2 className={styles.title}>{update.title}</h2>
          <p className={styles.description}>{update.description}</p>
        </div>

        <div className={styles.features}>
          {update.features.slice(0, 3).map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.featureHeader}>
                <span className={styles.featureEmoji}>{feature.emoji}</span>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
              </div>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="default"
            onClick={handleViewAll}
            className={styles.actionButton}
          >
            Подробнее
          </Button>
          <Button
            variant="primary"
            size="default"
            onClick={onClose}
            className={styles.actionButton}
          >
            Понятно
          </Button>
        </div>
      </div>
    </Modal>
  );
}