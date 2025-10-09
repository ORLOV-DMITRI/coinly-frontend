'use client';

import styles from './EditCategoryPage.module.scss';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import BackIcon from '/public/assets/svg/backArrow.svg';
import EmojiPickerModal from '@/features/categories/components/EmojiPickerModal/EmojiPickerModal';
import ItemsPickerModal from '@/features/categories/components/ItemsPickerModal/ItemsPickerModal';
import CategoryItemsList from '@/features/categories/components/CategoryItemsList/CategoryItemsList';
import {useState, FormEvent, useEffect, useMemo} from 'react';
import { useRouter } from 'next/navigation';
import {useCategories, useCategory} from '@/features/categories/hooks/useCategories';
import {useItems} from '@/features/items/hooks/useItems';
import DeleteIcon from '/public/assets/svg/delete.svg'
import {useConfirmDialog} from "@/shared/ui/ConfirmDialog/useConfirmDialog";
import ConfirmDialog from "@/shared/ui/ConfirmDialog/ConfirmDialog";


type FormData = {
    name: string;
    emoji: string;
    selectedItemIds: string[];
};

type Props = {
    categoryId: string;
};

export default function EditCategoryPage({categoryId}:Props) {
    const router = useRouter();

    const {data: category, isLoading} = useCategory(categoryId)
    const {items: allItems} = useItems();

    const { dialogState, showConfirm } = useConfirmDialog();


    const { updateCategory, isUpdating, deleteCategory, isDeleting } = useCategories();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        emoji: '🍞',
        selectedItemIds: [],
    });

    useEffect(() => {
        if (category) {
            console.log(category)
            setFormData({
                name: category.name,
                emoji: category.emoji || '📁',
                selectedItemIds: category.items ? category.items.map(item => item.id) : [],
            });
        }
    }, [category]);

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

    const selectedItems = useMemo(() => {
        return allItems.filter(item => formData.selectedItemIds.includes(item.id));
    }, [allItems, formData.selectedItemIds, categoryId]);

    const handleEmojiSelect = (emoji: string) => {
        setFormData(prev => ({ ...prev, emoji }));
    };

    const handleItemsSelect = (itemIds: string[]) => {
        setFormData(prev => ({ ...prev, selectedItemIds: itemIds }));
    };

    const handleToggleItem = (itemId: string) => {
        setFormData(prev => ({
            ...prev,
            selectedItemIds: prev.selectedItemIds.includes(itemId)
                ? prev.selectedItemIds.filter(id => id !== itemId)
                : [...prev.selectedItemIds, itemId]
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

        updateCategory({
            id: categoryId,
            data: {
                name: formData.name.trim(),
                emoji: formData.emoji || undefined,
                itemIds: formData.selectedItemIds.length > 0 ? formData.selectedItemIds : undefined,
            }
        }, {
            onSuccess: () => {
                router.push('/categories');
            },
        });
    };

    const handleDelete = async () => {
        if(!category) return

        const confirmed = await showConfirm({
            title: 'Удалить категорию',
            message: `Вы действительно хотите удалить категорию <span>"${category.name}"</span>? <br/> Это действие нельзя отменить.`
        });

        if (!confirmed) return;


        try {
            deleteCategory(categoryId, {
                onSuccess: () => {
                    router.push('/categories');
                },
            });
        } catch (error) {
            console.error('Ошибка удаления категории:', error);
        }
    };

    const handleCancel = () => {
        router.push('/categories');
    };

    return (
        <section className={styles.createPage}>
            <div className="container">
                <div className={styles.header}>
                    <button type="button" className={'backBtn'} onClick={handleCancel}>
                        <BackIcon/>
                    </button>
                    <h2>Изменение категории</h2>
                    <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        <DeleteIcon/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={'scrollPage'}>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="categoryName">
                                Название категории <span className={styles.required}>*</span>
                            </label>
                            {isLoading ? (
                                <div className={`${styles.skeleton} ${styles.skeletonInput}`}></div>
                            ) : (
                                <Input
                                    type="text"
                                    id="categoryName"
                                    name="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    error={errors.name}
                                    placeholder="Например: Продукты"
                                    autoFocus
                                />
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Эмодзи</label>
                            {isLoading ? (
                                <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
                            ) : (
                                <button
                                    type="button"
                                    className={styles.selectButton}
                                    onClick={() => setIsEmojiModalOpen(true)}
                                >
                                    <span className={styles.emoji}>{formData.emoji}</span>
                                    <span className={styles.selectText}>Выбрать</span>
                                    <span className={styles.arrow}>›</span>
                                </button>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.labels}>
                                <label className={styles.label}>Товары</label>

                                {selectedItems.length > 0 && <label className={styles.labelMuted}>Нажмите что бы удалить</label>}

                            </div>

                            {isLoading ? (
                                <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
                            ) : (
                                <>
                                    {selectedItems.length > 0 && (
                                        <CategoryItemsList
                                            items={selectedItems}
                                            selectedIds={formData.selectedItemIds}
                                            onToggle={handleToggleItem}
                                        />
                                    )}
                                    <button
                                        type="button"
                                        className={styles.addButton}
                                        onClick={() => setIsItemsModalOpen(true)}
                                    >
                                        + Добавить товары
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {!isLoading && (
                        <div className={styles.deleteSection}>
                            <Button
                                type="button"
                                variant={'danger'}
                                size={'large'}
                                onClick={handleDelete}
                                loading={isDeleting}
                                disabled={isUpdating}
                            >
                                Удалить категорию
                            </Button>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <div className={styles.actionsContainer}>
                            <Button
                                type="button"
                                variant={'secondary'}
                                size={'large'}
                                onClick={handleCancel}
                                disabled={isUpdating || isDeleting}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                variant={'primary'}
                                size={'large'}
                                loading={isUpdating}
                                disabled={isDeleting}
                            >
                                Сохранить
                            </Button>
                        </div>
                    </div>


                </form>

                <EmojiPickerModal
                    isOpen={isEmojiModalOpen}
                    onClose={() => setIsEmojiModalOpen(false)}
                    selectedEmoji={formData.emoji}
                    onSelect={handleEmojiSelect}
                />

                {!isLoading && (
                    <ItemsPickerModal
                        isOpen={isItemsModalOpen}
                        onClose={() => setIsItemsModalOpen(false)}
                        selectedItemIds={formData.selectedItemIds}
                        onSelect={handleItemsSelect}
                        showConfirm={showConfirm}
                    />
                )}


            </div>

            <ConfirmDialog
                isOpen={dialogState.isOpen}
                title={dialogState.title}
                message={dialogState.message}
                confirmText={dialogState.confirmText}
                cancelText={dialogState.cancelText}
                onConfirm={dialogState.onConfirm}
                onCancel={dialogState.onCancel}
            />
        </section>
    );
}
