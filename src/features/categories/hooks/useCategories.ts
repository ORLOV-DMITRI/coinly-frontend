import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '../services/categoriesService';
import type { CreateCategoryDto, UpdateCategoryDto } from '@/lib/types/api.types';
import toast from 'react-hot-toast';

const CATEGORIES_QUERY_KEY = ['categories'];

export function useCategories() {
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: categoriesService.getCategories,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateCategoryDto) => categoriesService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success('Категория создана');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка создания категории');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryDto }) =>
      categoriesService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['items'] });
      toast.success('Категория обновлена');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления категории');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => categoriesService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success('Категория удалена');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка удаления категории');
    },
  });

  return {
    categories,
    isLoading,
    error,
    createCategory: createMutation.mutate,
    updateCategory: updateMutation.mutate,
    deleteCategory: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoriesService.getCategoryById(id),
    enabled: !!id,
    staleTime: 0,
  });
}
