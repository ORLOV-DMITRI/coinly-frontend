import styles from './SelectedItemsAside.module.scss';
import cn from 'classnames';
import SelectedItemsList from '../SelectedItemsList/SelectedItemsList';
import type {Item} from '@/lib/types/api.types';

type SelectedItem = {
    item: Item;
    price: number;
    quantity: number;
};

type Props = {
    selectedItems: SelectedItem[];
    totalAmount: number;
    onQuantityChange: (index: number, quantity: number) => void;
    onRemoveItem: (index: number) => void;
    isVisible: boolean;
};

export default function SelectedItemsAside({selectedItems, totalAmount, onQuantityChange, onRemoveItem, isVisible}: Props) {

    if (!isVisible || selectedItems.length === 0) {
        return null;
    }

    return (
        <div className={styles.asideContainer}>
            <div className={styles.asideHeader}>
                <h3 className={styles.asideTitle}>Выбранные товары</h3>
                <span className={styles.itemsCount}>{selectedItems.length}</span>
            </div>

            <SelectedItemsList
                selectedItems={selectedItems}
                totalAmount={totalAmount}
                onQuantityChange={onQuantityChange}
                onRemoveItem={onRemoveItem}
                isAside={true}
            />
        </div>
    );
}