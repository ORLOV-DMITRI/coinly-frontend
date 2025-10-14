import api from '@/lib/settings/axios';
import type {
  GetExpensesResponse,
  GetExpenseResponse,
  CreateExpenseDto,
  CreateExpenseResponse,
  UpdateExpenseDto,
  UpdateExpenseResponse,
  DeleteExpenseResponse,
  GetStatsResponse,
  GetWeeklyStatsResponse,
  ExpensesQueryParams,
  StatsQueryParams,
} from '@/lib/types/api.types';

export const expensesService = {
  async getExpenses(params?: ExpensesQueryParams) {
    const response = await api.get<GetExpensesResponse>('/api/expenses', { params });
    return response.data.expenses;
  },

  async getExpenseById(id: string) {
    const response = await api.get<GetExpenseResponse>(`/api/expenses/${id}`);
    return response.data.expense;
  },

  async createExpense(data: CreateExpenseDto) {
    const response = await api.post<CreateExpenseResponse>('/api/expenses', data);
    return response.data.expense;
  },

  async updateExpense(id: string, data: UpdateExpenseDto) {
    const response = await api.put<UpdateExpenseResponse>(`/api/expenses/${id}`, data);
    return response.data.expense;
  },

  async deleteExpense(id: string) {
    const response = await api.delete<DeleteExpenseResponse>(`/api/expenses/${id}`);
    return response.data;
  },

  async getStats(params?: StatsQueryParams) {
    const response = await api.get<GetStatsResponse>('/api/expenses/stats', { params });
    return response.data.stats;
  },

  async getWeeklyStats(month?: string) {
    const params = month ? { month } : {};
    const response = await api.get<GetWeeklyStatsResponse>('/api/expenses/weekly-stats', { params });
    return response.data.weeklyStats;
  },
};
