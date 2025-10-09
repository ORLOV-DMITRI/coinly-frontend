import styles from './CategoryItemCheckbox.module.scss'
import type {Item} from "@/lib/types/api.types";



type ItemCheckboxProps = {
    item: Item;
    isSelected: boolean;
    onToggle: (itemId: string) => void;
};
export default function CategoryItemCheckbox({ item, isSelected, onToggle }: ItemCheckboxProps) {
    return (
        <label className={styles.itemCheckbox}>
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(item.id)}
                className={styles.checkbox}
            />
            <span className={styles.itemName}>{item.name}</span>
            {item.category && (
                <span className={styles.categoryBadge}>({item.category.name})</span>
            )}
        </label>
    );
}
