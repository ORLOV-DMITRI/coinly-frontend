import { useMutation, useQuery } from '@tanstack/react-query';
import { shoppingListsService } from '../services/shoppingListsService';
import type {
  CreateShoppingListDto,
  UpdateShoppingListDto,
  AddItemToShoppingListDto,
  UpdateShoppingListItemDto,
} from '@/lib/types/api.types';
import toast from 'react-hot-toast';
import { queryClient } from '@/lib/settings/react-query';

const SHOPPING_LISTS_QUERY_KEY = ['shopping-lists'];

export function useShoppingLists() {
  const { data: shoppingLists = [], isLoading, error } = useQuery({
    queryKey: SHOPPING_LISTS_QUERY_KEY,
    queryFn: () => shoppingListsService.getShoppingLists(),
    staleTime: 5 * 60 * 1000, // 5 минут
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateShoppingListDto) => shoppingListsService.createShoppingList(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_LISTS_QUERY_KEY });
      toast.success('Список покупок создан');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка создания списка покупок');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShoppingListDto }) =>
      shoppingListsService.updateShoppingList(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_LISTS_QUERY_KEY });
      toast.success('Список покупок обновлён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления списка покупок');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => shoppingListsService.deleteShoppingList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_LISTS_QUERY_KEY });
      toast.success('Список покупок удалён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления списка покупок');
    },
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => shoppingListsService.completeShoppingList(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SHOPPING_LISTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Покупки завершены! Расход создан');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка завершения покупок');
    },
  });

  return {
    shoppingLists,
    isLoading,
    error,
    createShoppingList: createMutation.mutate,
    updateShoppingList: updateMutation.mutate,
    deleteShoppingList: deleteMutation.mutate,
    completeShoppingList: completeMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isCompleting: completeMutation.isPending,
  };
}

export function useShoppingList(id: string) {
  return useQuery({
    queryKey: ['shopping-list', id],
    queryFn: () => shoppingListsService.getShoppingListById(id),
    enabled: !!id,
    staleTime: 0, // Всегда актуальные данные для активного списка
  });
}

export function useShoppingListItems(listId: string) {
  const addItemMutation = useMutation({
    mutationFn: (data: AddItemToShoppingListDto) =>
      shoppingListsService.addItemToShoppingList(listId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopping-list', listId] });
      toast.success('Товар добавлен в список');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка добавления товара');
    },
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ itemId, data }: { itemId: string; data: UpdateShoppingListItemDto }) =>
      shoppingListsService.updateShoppingListItem(listId, itemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopping-list', listId] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления товара');
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId: string) =>
      shoppingListsService.removeItemFromShoppingList(listId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shopping-list', listId] });
      toast.success('Товар удалён из списка');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления товара');
    },
  });

  return {
    addItem: addItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    removeItem: removeItemMutation.mutate,
    isAddingItem: addItemMutation.isPending,
    isUpdatingItem: updateItemMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
}