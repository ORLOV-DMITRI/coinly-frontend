import api from '@/lib/settings/axios';
import type {
  OneTimeExpense,
  CreateOneTimeExpenseDto,
  UpdateOneTimeExpenseDto,
  GetOneTimeExpensesResponse,
  CreateOneTimeExpenseResponse,
  UpdateOneTimeExpenseResponse,
  DeleteOneTimeExpenseResponse,
  GetOneTimeExpensesTotalResponse,
  OneTimeExpenseQueryParams,
} from '@/lib/types/api.types';

export const oneTimeExpenseService = {
  async getAll(params?: OneTimeExpenseQueryParams): Promise<OneTimeExpense[]> {
    const response = await api.get<GetOneTimeExpensesResponse>('/api/one-time-expenses', { params });
    return response.data.data;
  },

  async create(data: CreateOneTimeExpenseDto): Promise<OneTimeExpense> {
    const response = await api.post<CreateOneTimeExpenseResponse>('/api/one-time-expenses', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateOneTimeExpenseDto): Promise<OneTimeExpense> {
    const response = await api.put<UpdateOneTimeExpenseResponse>(`/api/one-time-expenses/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete<DeleteOneTimeExpenseResponse>(`/api/one-time-expenses/${id}`);
  },

  async getTotal(params?: OneTimeExpenseQueryParams): Promise<{ total: number; count: number }> {
    const response = await api.get<GetOneTimeExpensesTotalResponse>('/api/one-time-expenses/total', { params });
    return response.data.data;
  },
};
