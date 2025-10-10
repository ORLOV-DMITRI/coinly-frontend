import api from '@/lib/settings/axios';
import type {
  UpdateExpenseItemDto,
  CreateExpenseItemDto,
  DeleteExpenseItemResponse,
  UpdateExpenseItemResponse,
  CreateExpenseItemResponse,
} from '@/lib/types/api.types';

export const expenseItemService = {
  async deleteExpenseItem(expenseItemId: string) {
    const response = await api.delete<DeleteExpenseItemResponse>(`/api/expense-items/${expenseItemId}`);
    return response.data;
  },

  async updateExpenseItem(expenseItemId: string, data: UpdateExpenseItemDto) {
    const response = await api.put<UpdateExpenseItemResponse>(`/api/expense-items/${expenseItemId}`, data);
    return response.data.expenseItem;
  },

  async addExpenseItem(expenseId: string, data: CreateExpenseItemDto) {
    const response = await api.post<CreateExpenseItemResponse>(`/api/expense-items/expenses/${expenseId}/items`, data);
    return response.data.expenseItem;
  },
};
