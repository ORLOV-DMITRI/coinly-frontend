'use client';

import styles from './CreateItemPage.module.scss'
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import FavoriteIcon from '/public/assets/svg/favorite.svg'
import BackIcon from '/public/assets/svg/backArrow.svg'
import cn from "classnames";
import {useState, FormEvent, ChangeEvent} from 'react';
import { useRouter } from 'next/navigation';
import { useItems } from '@/features/items/hooks/useItems';
import { useCategories } from '@/features/categories/hooks/useCategories';

type FormData = {
    name: string;
    firstPrice: string;
    categoryId: string;
    isFavorite: boolean;
    additionalPrices: string[];
};

export default function CreateItemPage() {
    const router = useRouter();
    const { createItem, isCreating } = useItems();
    const { categories, isLoading: categoriesLoading } = useCategories();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        firstPrice: '',
        categoryId: '',
        isFavorite: false,
        additionalPrices: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleAddPrice = () => {
        setFormData(prev => ({
            ...prev,
            additionalPrices: [...prev.additionalPrices, ''],
        }));
    };

    const handleRemovePrice = (index: number) => {
        setFormData(prev => ({
            ...prev,
            additionalPrices: prev.additionalPrices.filter((item, i) => i !== index),
        }));
    };

    const handlePriceChange = (priceIndex: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            additionalPrices: prev.additionalPrices.map((price, currentIndex) => {
                if(currentIndex === priceIndex) {
                    return value
                }else {
                    return price
                }
            })
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.name.trim() || formData.name.trim().length < 2) {
            newErrors.name = 'Название должно содержать минимум 2 символа';
        }

        if (!formData.firstPrice || Number(formData.firstPrice) < 1) {
            newErrors.firstPrice = 'Укажите цену (минимум 1₽)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;


        const firstPriceNum = Number(formData.firstPrice);

        const validAdditionalPrices = formData.additionalPrices
            .filter(priceString => priceString.trim() !== '')
            .filter(priceString => Number(priceString) > 0)
            .map(priceString => Number(priceString));

        const allPrices = [
            firstPriceNum,
            ...validAdditionalPrices
        ];

        createItem({
            name: formData.name.trim(),
            prices: allPrices,
            categoryId: formData.categoryId || null,
            isFavorite: formData.isFavorite,
        }, {
            onSuccess: () => {
                router.push('/items');
            },
        });
    };

    const handleCancel = () => {
        router.push('/items');
    };

    return (
        <section className={styles.createPage}>
            <div className="container">

                <div className={styles.header}>
                    <button type="button" className={'backBtn'} onClick={handleCancel}>
                        <BackIcon/>
                    </button>
                    <h2>Создание товара</h2>
                    <div></div>
                </div>


                <form onSubmit={handleSubmit}>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemName">
                                Название товара <span className={styles.required}>*</span>
                            </label>
                            <Input
                                type="text"
                                id="itemName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                placeholder="Например: Молоко"
                                autoFocus
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemPrice">
                                Первая цена <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.priceInputWrapper}>
                                <Input
                                    type="number"
                                    id="itemPrice"
                                    name="firstPrice"
                                    value={formData.firstPrice}
                                    onChange={handleChange}
                                    error={errors.firstPrice}
                                    className={styles.priceInput}
                                    placeholder="70"
                                    step="10"
                                />
                                <span className={styles.currency}>₽</span>
                            </div>
                            <div className={styles.hint}>Основная цена товара</div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.checkboxWrapper}>
                                <input
                                    type="checkbox"
                                    name="isFavorite"
                                    checked={formData.isFavorite}
                                    onChange={handleChange}
                                    className={styles.checkbox}
                                />
                                <span className={styles.checkboxLabel}>
                                    <span><FavoriteIcon/></span>
                                    <span>Добавить в избранное</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className={styles.pricesSection}>
                        <h3 className={styles.pricesTitle}>Дополнительные цены</h3>
                        <p className={styles.pricesDescription}>
                            Добавьте типичные цены для быстрого выбора при создании расхода
                        </p>

                        <div className={styles.pricesList}>
                            {formData.additionalPrices.length === 0 ? (
                                <div className={styles.emptyPrices}>
                                    Пока нет дополнительных цен
                                </div>
                            ) : (
                                formData.additionalPrices.map((price, index) => (
                                    <div key={index} className={styles.priceItem}>
                                        <div className={cn(styles.priceInputWrapper, styles.priceItemInput)}>
                                            <Input
                                                type="number"
                                                value={price}
                                                onChange={(e) => handlePriceChange(index, e.target.value)}
                                                className={styles.priceInput}
                                                placeholder="80"
                                                step="10"
                                            />
                                            <span className={styles.currency}>₽</span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemovePrice(index)}
                                            className={styles.removeButton}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleAddPrice}
                            className={styles.addPriceButton}
                        >
                            <span>Добавить цену</span>
                        </button>
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
            </div>
        </section>
    );
}
