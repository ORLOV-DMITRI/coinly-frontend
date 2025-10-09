import styles from './CategoryItemsList.module.scss';
import type {Item, ItemBasic} from '@/lib/types/api.types';
import CategoryItemCheckbox from "@/features/categories/components/CategoryItemCheckbox/CategoryItemCheckbox";

type Props = {
    items: Item[];
    selectedIds: string[];
    onToggle: (itemId: string) => void;
};

export default function CategoryItemsList({ items, selectedIds, onToggle }: Props) {
    return (
        <div className={styles.itemsList}>
            {items.map(item => (
                <CategoryItemCheckbox
                    key={item.id}
                    item={item}
                    isSelected={selectedIds.includes(item.id)}
                    onToggle={() => onToggle(item.id)}
                />
            ))}
        </div>
    );
}
