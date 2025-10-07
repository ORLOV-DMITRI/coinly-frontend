import styles from './SearchSection.module.scss'
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import cn from "classnames";
import FavoriteIcon from '/public/assets/svg/favorite.svg'

export default function SearchSection() {
    return (
        <div className={styles.searchSection}>
            <Input
                type="search"
                className={styles.searchInput}
                placeholder="Поиск товаров..."

            />

            <div className={styles.filters}>
                <Button variant={'secondary'} size={'default'} isActive={true}>
                    Все
                </Button>
                <Button variant={'secondary'} className={styles.favoriteFilter}>
                    <span className={styles.favoriteIcon}><FavoriteIcon/></span> Избранное
                </Button>
            </div>

            <div className={cn(styles.itemsCount, 'mutedText')}>
                Показано: 8 товаров
            </div>
        </div>
    );
}
