import { useMutation, useQuery } from '@tanstack/react-query';
import { itemsService } from '../services/itemsService';
import type { CreateItemDto, UpdateItemDto, ItemsQueryParams } from '@/lib/types/api.types';
import toast from 'react-hot-toast';
import {queryClient} from "@/lib/settings/react-query";

const ITEMS_QUERY_KEY = ['items'];

export function useItems(params?: ItemsQueryParams) {

  const { data: items = [], isLoading, error } = useQuery({
    queryKey: [...ITEMS_QUERY_KEY, params],
    queryFn: () => itemsService.getItems(params),
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateItemDto) => itemsService.createItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      toast.success('Товар создан');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка создания товара');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateItemDto }) =>
      itemsService.updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      toast.success('Товар обновлён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления товара');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => itemsService.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
      toast.success('Товар удалён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления товара');
    },
  });

  return {
    items,
    isLoading,
    error,
    createItem: createMutation.mutate,
    updateItem: updateMutation.mutate,
    deleteItem: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useItem(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: () => itemsService.getItemById(id),
    enabled: !!id,
  });
}
