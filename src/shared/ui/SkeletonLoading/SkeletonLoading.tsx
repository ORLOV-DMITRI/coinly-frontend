import styles from './SkeletonLoading.module.scss'
import cn from "classnames";
import ItemSkeleton from "@/shared/ui/SkeletonLoading/ItemSkeleton/ItemSkeleton";

type Props = {
    variant: 'category' | 'block' | 'item' | 'blockName';
    count?: number
}

export default function SkeletonLoading({variant, count = 1}:Props) {

    const CurrentVariant = () => {
        switch (variant){
            case "category":
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
            case 'block':
                return (
                    <div className={cn(styles.skeleton, styles.skeletonBlock ,styles.shimmer)}></div>
                )
            case 'item':
                return (
                    <ItemSkeleton/>
                )
            case 'blockName':
                return (
                    <div className={styles.skeleton}>
                        <div className={styles.info}>
                            <div className={cn(styles.name, styles.shimmer)}></div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <CurrentVariant key={index} />
            ))}

        </>
    );
}
