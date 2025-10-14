import { useQuery } from '@tanstack/react-query';
import { expensesService } from '../../expenses/services/expensesService';
import type { StatsQueryParams } from '@/lib/types/api.types';

export function useStats(params?: StatsQueryParams) {
  return useQuery({
    queryKey: ['stats', params],
    queryFn: () => expensesService.getStats(params),
    staleTime: 5000,
  });
}
