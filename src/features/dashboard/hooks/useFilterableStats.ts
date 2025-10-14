import { useQuery } from '@tanstack/react-query';
import { expensesService } from '@/features/expenses/services/expensesService';
import type { FilterableStatsParams } from '@/lib/types/api.types';

export function useFilterableStats(params: FilterableStatsParams) {
  return useQuery({
    queryKey: ['filterable-stats', params.period, params.value, params.groupBy],
    queryFn: () => expensesService.getFilterableStats(params),
    staleTime: 5 * 60 * 1000,
  });
}
