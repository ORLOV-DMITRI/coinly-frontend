import styles from './SearchSection.module.scss';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import cn from 'classnames';
import FavoriteIcon from '/public/assets/svg/favorite.svg';
import {pluralize} from "@/shared/utils/pluralize";
import SearchInput from "@/shared/ui/SearchInput/SearchInput";

type Props = {
    search: string;
    onSearchChange: (value: string) => void;
    itemsCount: number;
    filter: 'all' | 'count';
    onFilterChange: (value: 'all' | 'count') => void;
};

export default function SearchSection({ search, onSearchChange, itemsCount, filter, onFilterChange }: Props) {
    return (
        <div className={styles.searchSection}>
            <SearchInput search={search} handleSearch={(value) => onSearchChange(value)} placeholder={'Поиск товаров...'}/>


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
                    isActive={filter === 'count'}
                    onClick={() => onFilterChange('count')}
                >
                    По количеству товаров
                </Button>
            </div>

            <div className={styles.info}>
                <div className={cn(styles.itemsCount, 'mutedText')}>
                    Найдено:   {pluralize(itemsCount, ['категория', 'категории', 'категорий'])}
                </div>
                <div className={styles.tips}>
                   Нажмите на элемент для редактирования
                </div>
            </div>


        </div>
    );
}
