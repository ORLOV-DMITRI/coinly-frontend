import styles from './SearchSection.module.scss';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import cn from 'classnames';
import FavoriteIcon from '/public/assets/svg/favorite.svg';

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    itemsCount: number;
};

export default function SearchSection({ search, onSearchChange, itemsCount }: Props) {
    return (
        <div className={styles.searchSection}>
            <Input
                type="search"
                className={styles.searchInput}
                placeholder="Поиск товаров..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
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
                Показано: {itemsCount} товаров
            </div>
        </div>
    );
}
