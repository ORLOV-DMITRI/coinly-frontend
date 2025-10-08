'use client';

import styles from './CreateCategoryPage.module.scss';
import Input from '@/shared/ui/Input/Input';
import Button from '@/shared/ui/Button/Button';
import BackIcon from '/public/assets/svg/backArrow.svg';
import EmojiPickerModal from '@/features/categories/components/EmojiPickerModal/EmojiPickerModal';
import ItemsPickerModal from '@/features/categories/components/ItemsPickerModal/ItemsPickerModal';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/features/categories/hooks/useCategories';

type FormData = {
    name: string;
    emoji: string;
    selectedItemIds: string[];
};

export default function CreateCategoryPage() {
    const router = useRouter();
    const { createCategory, isCreating } = useCategories();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        emoji: '🍞',
        selectedItemIds: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

    const handleEmojiSelect = (emoji: string) => {
        setFormData(prev => ({ ...prev, emoji }));
    };

    const handleItemsSelect = (itemIds: string[]) => {
        setFormData(prev => ({ ...prev, selectedItemIds: itemIds }));
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

        createCategory({
            name: formData.name.trim(),
            emoji: formData.emoji || undefined,
            itemIds: formData.selectedItemIds.length > 0 ? formData.selectedItemIds : undefined,
        }, {
            onSuccess: () => {
                router.push('/categories');
            },
        });
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
                    <h2>Создание категории</h2>
                    <div></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="categoryName">
                                Название категории <span className={styles.required}>*</span>
                            </label>
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
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Эмодзи</label>
                            <button
                                type="button"
                                className={styles.selectButton}
                                onClick={() => setIsEmojiModalOpen(true)}
                            >
                                <span className={styles.emoji}>{formData.emoji}</span>
                                <span className={styles.selectText}>Выбрать</span>
                                <span className={styles.arrow}>›</span>
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Товары</label>
                            <button
                                type="button"
                                className={styles.selectButton}
                                onClick={() => setIsItemsModalOpen(true)}
                            >
                                <span className={styles.selectText}>
                                    {formData.selectedItemIds.length > 0
                                        ? `${formData.selectedItemIds.length} выбрано`
                                        : 'Выбрать товары'}
                                </span>
                                <span className={styles.arrow}>›</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.actionsContainer}>
                            <Button
                                type="button"
                                variant={'secondary'}
                                size={'large'}
                                onClick={handleCancel}
                                disabled={isCreating}
                            >
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                variant={'primary'}
                                size={'large'}
                                loading={isCreating}
                            >
                                Создать
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

                <ItemsPickerModal
                    isOpen={isItemsModalOpen}
                    onClose={() => setIsItemsModalOpen(false)}
                    selectedItemIds={formData.selectedItemIds}
                    onSelect={handleItemsSelect}
                />
            </div>
        </section>
    );
}
