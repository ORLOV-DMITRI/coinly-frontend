import { useMutation, useQuery } from '@tanstack/react-query';
import { expensesService } from '../services/expensesService';
import { expenseItemService } from '../services/expenseItemService';
import type {
  CreateExpenseDto,
  UpdateExpenseDto,
  ExpensesQueryParams,
  UpdateExpenseItemDto,
  CreateExpenseItemDto,
} from '@/lib/types/api.types';
import toast from 'react-hot-toast';
import { queryClient } from '@/lib/settings/react-query';

const EXPENSES_QUERY_KEY = ['expenses'];

export function useExpenses(params?: ExpensesQueryParams) {

  const { data: expenses = [], isLoading, isFetching, error } = useQuery({
    queryKey: [...EXPENSES_QUERY_KEY, params],
    queryFn: () => expensesService.getExpenses(params),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateExpenseDto) => expensesService.createExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Расход добавлен');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка создания расхода');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateExpenseDto }) =>
      expensesService.updateExpense(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Расход обновлён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления расхода');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => expensesService.deleteExpense(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Расход удалён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления расхода');
    },
  });

  const deleteExpenseItemMutation = useMutation({
    mutationFn: (expenseItemId: string) => expenseItemService.deleteExpenseItem(expenseItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Товар удалён из расхода');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления товара');
    },
  });

  const updateExpenseItemMutation = useMutation({
    mutationFn: ({ expenseItemId, data }: { expenseItemId: string; data: UpdateExpenseItemDto }) =>
      expenseItemService.updateExpenseItem(expenseItemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Товар обновлён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления товара');
    },
  });

  const addExpenseItemMutation = useMutation({
    mutationFn: ({ expenseId, data }: { expenseId: string; data: CreateExpenseItemDto }) =>
      expenseItemService.addExpenseItem(expenseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Товар добавлен к расходу');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка добавления товара');
    },
  });

  return {
    expenses,
    isLoading,
    isFetching,
    error,
    createExpense: createMutation.mutate,
    updateExpense: updateMutation.mutate,
    deleteExpense: deleteMutation.mutate,
    deleteExpenseItem: deleteExpenseItemMutation.mutate,
    updateExpenseItem: updateExpenseItemMutation.mutate,
    addExpenseItem: addExpenseItemMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isDeletingItem: deleteExpenseItemMutation.isPending,
    isUpdatingItem: updateExpenseItemMutation.isPending,
    isAddingItem: addExpenseItemMutation.isPending,
  };
}

export function useExpense(id: string) {
  return useQuery({
    queryKey: ['expense', id],
    queryFn: () => expensesService.getExpenseById(id),
    enabled: !!id,
    staleTime: 0,
  });
}
