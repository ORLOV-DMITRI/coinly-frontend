import styles from './ItemSkeleton.module.scss'
import cn from "classnames";

export default function ItemSkeleton() {
    return (
        <div className={cn(styles.skeleton, 'card')}>
          <div className={styles.header}>
            <div>
              <div className={cn(styles.name, styles.shimmer)}></div>
              <div className={cn(styles.category, styles.shimmer)}></div>
            </div>
            <div className={cn(styles.favorite, styles.shimmer)}></div>
          </div>
          <div className={styles.prices}>
            <div className={cn(styles.price, styles.shimmer)}></div>
            <div className={cn(styles.price, styles.shimmer)}></div>
            <div className={cn(styles.price, styles.shimmer)}></div>
          </div>
        </div>
    );
}
