import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { oneTimeExpenseService } from '../services/oneTimeExpenseService';
import type { CreateOneTimeExpenseDto, UpdateOneTimeExpenseDto, OneTimeExpenseQueryParams } from '@/lib/types/api.types';
import toast from 'react-hot-toast';

const ONE_TIME_EXPENSES_QUERY_KEY = ['oneTimeExpenses'];

export function useOneTimeExpenses(params?: OneTimeExpenseQueryParams) {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, error } = useQuery({
    queryKey: [...ONE_TIME_EXPENSES_QUERY_KEY, params],
    queryFn: async () => {
      return oneTimeExpenseService.getAll(params);
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateOneTimeExpenseDto) => {
      return oneTimeExpenseService.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ONE_TIME_EXPENSES_QUERY_KEY });
      toast.success('Разовый расход добавлен');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка добавления разового расхода');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateOneTimeExpenseDto }) => {
      return oneTimeExpenseService.update(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ONE_TIME_EXPENSES_QUERY_KEY });
      toast.success('Разовый расход обновлён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления разового расхода');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return oneTimeExpenseService.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ONE_TIME_EXPENSES_QUERY_KEY });
      toast.success('Разовый расход удалён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления разового расхода');
    },
  });

  return {
    expenses,
    isLoading,
    error,
    createExpense: createMutation.mutate,
    updateExpense: updateMutation.mutate,
    deleteExpense: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useOneTimeExpensesTotal(params?: OneTimeExpenseQueryParams) {
  const { data, isLoading, error } = useQuery({
    queryKey: [...ONE_TIME_EXPENSES_QUERY_KEY, 'total', params],
    queryFn: async () => {
      return oneTimeExpenseService.getTotal(params);
    },
  });

  return {
    total: data?.total || 0,
    count: data?.count || 0,
    isLoading,
    error,
  };
}
