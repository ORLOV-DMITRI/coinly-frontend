import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './ConfirmDialog.module.scss';
import Button from "@/shared/ui/Button/Button";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Удалить',
  cancelText = 'Отмена',
  onConfirm,
  onCancel,
  className
}: Props) {

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={cn(styles.overlay, className)} onClick={handleBackdropClick}>
      <div className={styles.dialog}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.message} dangerouslySetInnerHTML={{__html: message}}/>
        </div>

        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="default"
            onClick={onCancel}
            className={styles.cancelBtn}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            size="default"
            onClick={onConfirm}
            className={styles.confirmBtn}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}