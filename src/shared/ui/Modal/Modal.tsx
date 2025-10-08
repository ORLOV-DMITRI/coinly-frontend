import styles from './Modal.module.scss';
import cn from 'classnames';
import { ReactNode, useEffect } from 'react';
import BackIcon from '/public/assets/svg/backArrow.svg';
import CloseIcon from '/public/assets/svg/close.svg';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    className?: string;
};

export default function Modal({ isOpen, onClose, title, children, className }: Props) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={cn(styles.modal, className)} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <button type="button" className={styles.backBtn} onClick={onClose}>
                        <BackIcon />
                    </button>
                    <h3 className={styles.title}>{title}</h3>
                    <button type="button" className={styles.closeBtn} onClick={onClose}>
                        <CloseIcon/>
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
