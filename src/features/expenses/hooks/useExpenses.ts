import { useMutation, useQuery } from '@tanstack/react-query';
import { expensesService } from '../services/expensesService';
import type {
  CreateExpenseDto,
  UpdateExpenseDto,
  ExpensesQueryParams
} from '@/lib/types/api.types';
import toast from 'react-hot-toast';
import { queryClient } from '@/lib/settings/react-query';

const EXPENSES_QUERY_KEY = ['expenses'];

export function useExpenses(params?: ExpensesQueryParams) {

  const { data: expenses = [], isLoading, isFetching, error } = useQuery({
    queryKey: [...EXPENSES_QUERY_KEY, params],
    queryFn: () => expensesService.getExpenses(params),
    placeholderData: (previousData) => previousData, // keepPreviousData в новой версии React Query
    staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
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

  return {
    expenses,
    isLoading,
    isFetching,
    error,
    createExpense: createMutation.mutate,
    updateExpense: updateMutation.mutate,
    deleteExpense: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useExpense(id: string) {
  return useQuery({
    queryKey: ['expense', id],
    queryFn: () => expensesService.getExpenseById(id),
    enabled: !!id,
  });
}
