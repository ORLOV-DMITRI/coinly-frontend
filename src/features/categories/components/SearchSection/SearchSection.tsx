import styles from './SearchSection.module.scss';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import cn from 'classnames';
import FavoriteIcon from '/public/assets/svg/favorite.svg';

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    itemsCount: number;
    filter: 'all' | 'abc' | 'count';
    onFilterChange: (value: 'all' | 'abc' | 'count') => void;
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
                    isActive={filter === 'abc'}
                    onClick={() => onFilterChange('abc')}
                >
                    По алфавиту
                </Button>
                <Button
                    variant={'secondary'}
                    className={styles.favoriteFilter}
                    isActive={filter === 'count'}
                    onClick={() => onFilterChange('count')}
                >
                    По количеству товаров
                </Button>
            </div>

            <div className={styles.info}>
                <div className={cn(styles.itemsCount, 'mutedText')}>
                    Показано: {itemsCount} товаров
                </div>
                <div className={styles.tips}>
                   Нажмите на элемент для редактирования
                </div>
            </div>


        </div>
    );
}
