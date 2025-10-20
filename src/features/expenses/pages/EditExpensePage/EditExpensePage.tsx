'use client';

import styles from './EditExpensePage.module.scss';
import cn from 'classnames';
import {FormEvent, useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import ItemSelector from '../../components/ItemSelector/ItemSelector';
import PriceSelectionModal from '../../components/PriceSelectionModal/PriceSelectionModal';
import CreateItemModal from '../../components/CreateItemModal/CreateItemModal';
import SelectedItemsList from '../../components/SelectedItemsList/SelectedItemsList';
import SelectedItemsAside from '../../components/SelectedItemsAside/SelectedItemsAside';
import {useExpense, useExpenses} from '../../hooks/useExpenses';
import {useAsideVisibility} from '../../hooks/useAsideVisibility';
import type {Item} from '@/lib/types/api.types';
import PageHeader from '@/shared/ui/PageHeader/PageHeader';
import Button from '@/shared/ui/Button/Button';
import ActionButtons from '@/shared/ui/ActionButtons/ActionButtons';
import ConfirmDialog from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import {useConfirmDialog} from '@/shared/ui/ConfirmDialog/useConfirmDialog';
import SkeletonLoading from '@/shared/ui/SkeletonLoading/SkeletonLoading';
import {formatDate} from "@/shared/utils/formatDate";

type ExpenseItemData = {
    id: string;
    itemId: string;
    itemName: string;
    amount: number;
    quantity: number;
};

type FormData = {
    date: string;
    items: ExpenseItemData[];
};

type SelectedItem = {
    item: Item;
    price: number;
    quantity: number;
};

type Props = {
    expenseId: string;
};

export default function EditExpensePage({expenseId}: Props) {
    const router = useRouter();
    const {data: expense, isLoading} = useExpense(expenseId);
    const {
        deleteExpense,
        deleteExpenseItem,
        updateExpenseItem,
        addExpenseItem,
        isDeleting,
        isDeletingItem,
        isUpdatingItem,
        isAddingItem,
    } = useExpenses();
    const {dialogState, showConfirm} = useConfirmDialog();
    const {shouldShowAside, selectedItemsRef, updateItemsPresence} = useAsideVisibility();

    const [formData, setFormData] = useState<FormData>({
        date: '',
        items: [],
    });

    const [originalItems, setOriginalItems] = useState<ExpenseItemData[]>([]);
    const [deletedItems, setDeletedItems] = useState<string[]>([]);
    const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);

    useEffect(() => {
        if (expense) {
            const itemsData = expense.items.map((expenseItem) => ({
                id: expenseItem.id,
                itemId: expenseItem.itemId,
                itemName: expenseItem.item.name,
                amount: expenseItem.amount,
                quantity: expenseItem.quantity,
            }));

            setFormData({
                date: expense.date,
                items: itemsData,
            });
            setOriginalItems(itemsData);
        }
    }, [expense]);

    useEffect(() => {
        updateItemsPresence(formData.items.length);
    }, [formData.items.length, updateItemsPresence]);

    const convertToSelectedItems = (): SelectedItem[] => {
        if (!expense) return [];
        return formData.items.map((formItem) => {
            const expenseItem = expense.items.find((ei) => ei.id === formItem.id);
            const item: Item = (expenseItem?.item || {
                id: formItem.itemId,
                name: formItem.itemName,
                prices: [],
                categoryId: null,
                isFavorite: false,
                userId: '',
                createdAt: new Date().toISOString(),
            }) as Item;
            return {
                item,
                price: formItem.amount,
                quantity: formItem.quantity,
            };
        });
    };

    const selectedItemsForAside = convertToSelectedItems();

    const handleQuantityChange = (index: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setFormData((prev) => ({
            ...prev,
            items: prev.items.map((item, i) =>
                i === index ? {...item, quantity: newQuantity} : item
            ),
        }));
    };

    const handleRemoveItem = (index: number) => {
        const itemToRemove = formData.items[index];
        if (itemToRemove && !itemToRemove.id.startsWith('temp-')) {
            setDeletedItems((prev) => [...prev, itemToRemove.id]);
        }
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    const handleItemSelect = (item: Item) => {
        setCurrentItem(item);
        setIsPriceModalOpen(true);
    };

    const handlePriceSelect = (price: number, quantity: number) => {
        if (currentItem) {
            const tempItem: ExpenseItemData = {
                id: `temp-${Date.now()}`,
                itemId: currentItem.id,
                itemName: currentItem.name,
                amount: price,
                quantity,
            };
            setFormData((prev) => ({
                ...prev,
                items: [...prev.items, tempItem],
            }));
            setCurrentItem(null);
        }
    };

    const handleItemCreated = (newItem: Item) => {
        setIsCreateItemModalOpen(false);
        setCurrentItem(newItem);
        setIsPriceModalOpen(true);
    };

    const handleDelete = async () => {
        if (!expense) return;

        const confirmed = await showConfirm({
            title: 'Удалить расход',
            message: `Вы действительно хотите удалить расход <span>от ${formatDate(
                expense.date
            )}</span>?<br/>Это действие нельзя отменить.`,
        });

        if (!confirmed) return;

        deleteExpense(expenseId);
        router.push('/expenses');
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.items.length === 0) {
            const confirmed = await showConfirm({
                title: 'Удалить расход',
                message:
                    'У расхода не осталось товаров. Расход будет полностью удалён.<br/>Продолжить?',
            });

            if (!confirmed) return;

            deleteExpense(expenseId);
            router.push('/expenses');
            return;
        }

        const operations: Promise<any>[] = [];

        for (const itemId of deletedItems) {
            operations.push(
                new Promise<void>((resolve) => {
                    deleteExpenseItem(itemId);
                    resolve();
                })
            );
        }

        for (const item of formData.items) {
            if (item.id.startsWith('temp-')) {
                operations.push(
                    new Promise<void>((resolve) => {
                        addExpenseItem({
                            expenseId,
                            data: {
                                itemId: item.itemId,
                                amount: item.amount,
                                quantity: item.quantity,
                            },
                        });
                        resolve();
                    })
                );
            } else {
                const original = originalItems.find((o) => o.id === item.id);
                if (
                    original &&
                    (original.amount !== item.amount || original.quantity !== item.quantity)
                ) {
                    operations.push(
                        new Promise<void>((resolve) => {
                            updateExpenseItem({
                                expenseItemId: item.id,
                                data: {
                                    amount: item.amount,
                                    quantity: item.quantity,
                                },
                            });
                            resolve();
                        })
                    );
                }
            }
        }

        await Promise.all(operations);

        setTimeout(() => {
            router.push('/expenses');
        }, 500);
    };



    const totalAmount = formData.items.reduce(
        (sum, item) => sum + item.amount * item.quantity,
        0
    );

    const selectedItemIds = formData.items.map((item) => item.itemId);

    const isSaving = isDeletingItem || isUpdatingItem || isAddingItem;

    if (isLoading) {
        return (
            <div className={'page'}>
                <PageHeader title={'Обновление расхода'} actionType={'back'}/>
                <div className={cn(styles.container, 'container')}>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Дата</div>
                        <SkeletonLoading variant={'block'}/>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.sectionTitle}>Товары</div>
                        <SkeletonLoading variant={'block'}/>
                    </div>
                </div>
            </div>
        );
    }

    if (!expense) {
        return (
            <div className={'page'}>
                <PageHeader title={'Обновление расхода'} actionType={'back'}/>
                <div className={cn(styles.container, 'container')}>
                    <p>Расход не найден</p>
                </div>
            </div>
        );
    }

    return (
        <div className={'page'}>
            <PageHeader title={'Обновление расхода'} actionType={'back'}/>

            <form onSubmit={handleSubmit} className={cn(styles.container, 'container')}>
                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Дата</div>
                    <div className={styles.dateDisplay}>{formatDate(formData.date)}</div>
                </div>

                <div className={styles.section}>
                    <div className={styles.sectionTitle}>Добавить товар</div>
                    <ItemSelector
                        onItemSelect={handleItemSelect}
                        onCreateItem={() => setIsCreateItemModalOpen(true)}
                        selectedItemIds={selectedItemIds}
                    />
                </div>

                {formData.items.length > 0 && (
                    <div className={styles.section} ref={selectedItemsRef}>
                        <div className={styles.sectionTitle}>Текущие товары</div>
                        <SelectedItemsList
                            selectedItems={selectedItemsForAside}
                            totalAmount={totalAmount}
                            onQuantityChange={handleQuantityChange}
                            onRemoveItem={handleRemoveItem}
                        />
                    </div>
                )}

                <div className={styles.deleteSection}>
                    <Button
                        type="button"
                        variant={'danger'}
                        size={'default'}
                        onClick={handleDelete}
                        loading={isDeleting}
                        disabled={isSaving}
                    >
                        Удалить расход
                    </Button>
                </div>

                <ActionButtons isDisabled={isSaving} submitLabel={'Обновить'} isSubmitLabel={'Обновление'}/>
            </form>

            {currentItem && (
                <PriceSelectionModal
                    item={currentItem}
                    isOpen={isPriceModalOpen}
                    onClose={() => {
                        setIsPriceModalOpen(false);
                        setCurrentItem(null);
                    }}
                    onPriceSelect={handlePriceSelect}
                />
            )}

            <CreateItemModal
                isOpen={isCreateItemModalOpen}
                onClose={() => setIsCreateItemModalOpen(false)}
                onItemCreated={handleItemCreated}
            />

            <SelectedItemsAside
                selectedItems={selectedItemsForAside}
                totalAmount={totalAmount}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                isVisible={shouldShowAside}
            />

            <ConfirmDialog
                isOpen={dialogState.isOpen}
                title={dialogState.title}
                message={dialogState.message}
                confirmText={dialogState.confirmText}
                cancelText={dialogState.cancelText}
                onConfirm={dialogState.onConfirm}
                onCancel={dialogState.onCancel}
            />
        </div>
    );
}
