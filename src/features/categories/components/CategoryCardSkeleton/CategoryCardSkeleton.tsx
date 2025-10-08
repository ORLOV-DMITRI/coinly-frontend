import styles from './CategoryCardSkeleton.module.scss';
import cn from 'classnames';

export default function CategoryCardSkeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={cn(styles.emoji, styles.shimmer)}></div>
            <div className={styles.info}>
                <div className={cn(styles.name, styles.shimmer)}></div>
                <div className={cn(styles.count, styles.shimmer)}></div>
            </div>
            <div className={cn(styles.arrow, styles.shimmer)}></div>
        </div>
    );
}
