import {useQuery} from "@tanstack/react-query";
import {expensesService} from "@/features/expenses/services/expensesService";


export function useWeeklyStats(month: string) {
    return useQuery({
        queryKey: ['weekly-stats', month],
        queryFn: () => expensesService.getWeeklyStats(month),
        staleTime: 5 * 60 * 1000,
    });
}
