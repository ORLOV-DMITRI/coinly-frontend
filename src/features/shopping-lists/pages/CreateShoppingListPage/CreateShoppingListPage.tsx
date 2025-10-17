'use client';

import styles from './CreateShoppingListPage.module.scss';
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import cn from "classnames";
import {useState, FormEvent, ChangeEvent} from 'react';
import {useRouter} from 'next/navigation';
import {useShoppingLists} from '@/features/shopping-lists/hooks/useShoppingLists';
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import ActionButtons from "@/shared/ui/ActionButtons/ActionButtons";
import {normalizeItemName} from "@/shared/utils/textUtils";
import ItemSelector from "@/features/expenses/components/ItemSelector/ItemSelector";
import type {Item} from '@/lib/types/api.types';

type FormData = {
    name: string;
    selectedItems: Item[];
};

export default function CreateShoppingListPage() {
    const router = useRouter();
    const {createShoppingList, isCreating} = useShoppingLists();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        selectedItems: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormData]) {
            setErrors(prev => ({...prev, [name]: undefined}));
        }
    };

    const handleItemSelect = (item: Item) => {
        setFormData(prev => {
            const isAlreadySelected = prev.selectedItems.some(selectedItem => selectedItem.id === item.id);

            if (isAlreadySelected) {
                // Убираем товар если уже выбран
                return {
                    ...prev,
                    selectedItems: prev.selectedItems.filter(selectedItem => selectedItem.id !== item.id)
                };
            } else {
                // Добавляем товар
                return {
                    ...prev,
                    selectedItems: [...prev.selectedItems, item]
                };
            }
        });
    };

    const handleRemoveItem = (itemId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedItems: prev.selectedItems.filter(item => item.id !== itemId)
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = 'Название должно содержать минимум 2 символа';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const itemIds = formData.selectedItems.map(item => item.id);

        createShoppingList({
            name: normalizeItemName(formData.name),
            itemIds: itemIds.length > 0 ? itemIds : undefined,
        }, {
            onSuccess: () => {
                router.push('/shopping-lists');
            },
        });
    };

    const selectedItemIds = formData.selectedItems.map(item => item.id);

    return (
        <section className={'page'}>
            <PageHeader title={'Новый список покупок'} actionType={'back'}/>

            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="listName">
                                Название списка <span className={styles.required}>*</span>
                            </label>
                            <Input
                                type="text"
                                id="listName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                placeholder="Например: Покупки на выходные"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className={styles.itemsSection}>
                        <h3 className={styles.itemsTitle}>Товары в списке</h3>
                        <p className={styles.itemsDescription}>
                            Выберите товары, которые планируете купить. Можно добавить товары и позже.
                        </p>

                        {formData.selectedItems.length > 0 && (
                            <div className={styles.selectedItems}>
                                <h4 className={styles.selectedItemsTitle}>
                                    Выбранные товары ({formData.selectedItems.length})
                                </h4>
                                <div className={styles.selectedItemsList}>
                                    {formData.selectedItems.map(item => (
                                        <div key={item.id} className={styles.selectedItem}>
                                            <div className={styles.selectedItemInfo}>
                                                <span className={styles.selectedItemName}>{item.name}</span>
                                                {item.category && (
                                                    <span className={styles.selectedItemCategory}>
                                                        {item.category.emodji} {item.category.name}
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(item.id)}
                                                className={styles.removeButton}
                                                title="Убрать из списка"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.itemSelector}>
                            <h4 className={styles.selectorTitle}>Выбрать товары</h4>
                            <ItemSelector
                                onItemSelect={handleItemSelect}
                                selectedItemIds={selectedItemIds}
                                clearSearchAfterSelect={false}
                            />
                        </div>
                    </div>

                    <ActionButtons
                        isDisabled={isCreating}
                        submitLabel={'Создать список'}
                        isSubmitLabel={'Создание...'}
                    />
                </form>
            </div>
        </section>
    );
}