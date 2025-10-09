import styles from './ItemSelectorList.module.scss'
import cn from "classnames";
import {Item} from "@/lib/types/api.types";

type Props = {
    items: Item[]
    isItemSelected: (itemId: string) => boolean
    onItemSelect: (item: Item) => void;
    label: string
}

export default function ItemSelectorList({items, isItemSelected, onItemSelect, label}:Props) {

    return (
        <div className={styles.section}>
            <div className={styles.sectionLabel}>
                {label}
            </div>
            <div className={styles.itemsList}>
                {items.map(item => {
                    const isSelected = isItemSelected(item.id);
                    return (
                        <button key={item.id} type="button"
                            className={cn(styles.itemCard, isSelected && styles.disabled)}
                            onClick={() => !isSelected && onItemSelect(item)}
                            disabled={isSelected}
                        >
                            <div>
                                <div className={styles.itemName}>
                                    {item.name}
                                    {isSelected && <span className={styles.addedBadge}> ✓</span>}
                                </div>
                                {item.category && (
                                    <div className={styles.itemCategory}>
                                        {item.category.name}
                                    </div>
                                )}
                            </div>
                            <div className={styles.itemArrow}>+</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
