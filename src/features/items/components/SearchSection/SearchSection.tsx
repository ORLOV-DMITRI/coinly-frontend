import styles from './SearchSection.module.scss';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import cn from 'classnames';
import FavoriteIcon from '/public/assets/svg/favorite.svg';
import {pluralize} from "@/shared/utils/pluralize";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    itemsCount: number;
    filter: 'all' | 'favorite';
    onFilterChange: (value: 'all' | 'favorite') => void;
};

export default function SearchSection({ search, onSearchChange, itemsCount, filter, onFilterChange }: Props) {
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
                <Button
                    variant={'secondary'}
                    size={'default'}
                    isActive={filter === 'all'}
                    onClick={() => onFilterChange('all')}
                >
                    Все
                </Button>
                <Button
                    variant={'secondary'}
                    className={styles.favoriteFilter}
                    isActive={filter === 'favorite'}
                    onClick={() => onFilterChange('favorite')}
                >
                    <span className={styles.favoriteIcon}><FavoriteIcon/></span> Избранное
                </Button>
            </div>

            <div className={styles.info}>
                <div className={cn(styles.itemsCount, 'mutedText')}>
                    Найдено:  {pluralize(itemsCount, ['товар', 'товара', 'товаров'])}
                </div>
                <div className={styles.tips}>
                   Нажмите на элемент для редактирования
                </div>
            </div>


        </div>
    );
}
