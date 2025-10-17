import styles from './CatModal.module.scss';
import { useScrollLock } from '@/lib/hooks/useScrollLock';
import Button from "@/shared/ui/Button/Button";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CatModal({ isOpen, onClose }: Props) {
    useScrollLock(isOpen);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    <div className={styles.emoji}>🐱</div>
                    <h2 className={styles.title}>Вы поймали попучника!</h2>
                    <p className={styles.message}>
                        А теперь идите и погладьте ваших котов 😸
                    </p>
                    <Button size={'default'} variant={'primary'} onClick={onClose}>
                        Хорошо!
                    </Button>
                </div>
            </div>
        </div>
    );
}
