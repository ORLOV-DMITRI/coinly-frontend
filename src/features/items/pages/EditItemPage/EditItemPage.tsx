'use client';

import styles from './EditItemPage.module.scss'
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import FavoriteIcon from '/public/assets/svg/favorite.svg'
import BackIcon from '/public/assets/svg/backArrow.svg'
import DeleteIcon from '/public/assets/svg/delete.svg'
import cn from "classnames";
import {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useItem, useItems} from '@/features/items/hooks/useItems';
import {useCategories} from '@/features/categories/hooks/useCategories';
import ConfirmDialog from "@/shared/ui/ConfirmDialog/ConfirmDialog";
import {useConfirmDialog} from "@/shared/ui/ConfirmDialog/useConfirmDialog";
import PageHeader from "@/shared/ui/PageHeader/PageHeader";
import SkeletonLoading from "@/shared/ui/SkeletonLoading/SkeletonLoading";
import ActionButtons from "@/shared/ui/ActionButtons/ActionButtons";


type FormData = {
    name: string;
    firstPrice: string;
    categoryId: string;
    isFavorite: boolean;
    additionalPrices: string[];
};

type Props = {
    itemId: string;
};

export default function EditItemPage({itemId}: Props) {
    const router = useRouter();

    const {data: item, isLoading} = useItem(itemId)

    const {updateItem, isUpdating, deleteItem, isDeleting} = useItems();

    const { dialogState, showConfirm } = useConfirmDialog();


    const [formData, setFormData] = useState<FormData>({
        name: '',
        firstPrice: '',
        categoryId: '',
        isFavorite: false,
        additionalPrices: [],
    });

    useEffect(() => {
        if (item) {
            const currentAdditionalPrices = item.prices.slice(1);
            const currentPricesString = currentAdditionalPrices.map(item => item.toString());

            const editItem: FormData = {
                name: item.name,
                firstPrice: item.prices[0].toString(),
                categoryId: item.categoryId || '',
                isFavorite: item.isFavorite,
                additionalPrices: currentPricesString,
            };

            setFormData(editItem);
        }
    }, [item]);

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name as keyof FormData]) {
            setErrors(prev => ({...prev, [name]: undefined}));
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
                if (currentIndex === priceIndex) {
                    return value
                } else {
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


        updateItem({
            id: itemId,
            data: {
                name: formData.name.trim(),
                prices: allPrices,
                categoryId: formData.categoryId || null,
                isFavorite: formData.isFavorite,
            },
        }, {
            onSuccess: () => {
                router.push('/items');
            },
        })
    };

    const handleDelete = async () => {
        if(!item) return

        const confirmed = await showConfirm({
            title: 'Удалить товар',
            message: `Вы действительно хотите удалить товар <span>"${item.name}"</span>? <br/> Это действие нельзя отменить.`
        });

        if (!confirmed) return;


        try {
            deleteItem(itemId, {
                onSuccess: () => {
                    router.push('/items');
                },
            });
        } catch (error) {
            console.error('Ошибка удаления товара:', error);
        }
    };

    return (
        <section className={'page'}>
            <PageHeader title={'Обновление товара'} actionType={'back'}/>
            <div className="container">

                <form onSubmit={handleSubmit}>
                    <div className={styles.formSection}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemName">
                                Название товара <span className={styles.required}>*</span>
                            </label>

                            {isLoading ? (
                                <SkeletonLoading variant={'block'}/>
                            ) : (
                                <Input type="text" id="itemName" name="name" value={formData.name}
                                       onChange={handleChange}
                                       error={errors.name}
                                       placeholder="Например: Молоко"
                                       autoFocus
                                />
                            )}


                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="itemPrice">
                                Первая цена <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.priceInputWrapper}>

                                {isLoading ? (
                                    <SkeletonLoading variant={'block'}/>
                                ) : (
                                    <Input
                                        type="number"
                                        id="itemPrice"
                                        name="firstPrice"
                                        value={formData.firstPrice}
                                        onChange={handleChange}
                                        error={errors.firstPrice}
                                        placeholder="70"
                                        step="10"
                                        className={cn(styles.priceInput)}
                                    />
                                )}

                                <span className={styles.currency}>₽</span>
                            </div>
                            <div className={styles.hint}>Основная цена товара</div>
                        </div>


                        <div className={styles.formGroup}>
                            {isLoading ? (
                                <SkeletonLoading variant={'block'}/>
                            ) : (
                                <label className={cn(styles.checkboxWrapper)}>
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
                            )}


                        </div>
                    </div>

                    <div className={cn(styles.pricesSection)}>
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
                                        <button type="button" onClick={() => handleRemovePrice(index)} className={styles.removeButton}>
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

                    {!isLoading && (
                        <div className={styles.deleteSection}>
                            <Button
                                type="button"
                                variant={'danger'}
                                size={'default'}
                                onClick={handleDelete}
                                loading={isDeleting}
                                disabled={isUpdating}
                            >
                                Удалить товар
                            </Button>
                        </div>
                    )}

                    <ActionButtons isDisabled={isUpdating} submitLabel={'Обновить'}/>
                </form>
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
