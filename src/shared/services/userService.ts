import api from '@/lib/settings/axios';
import type {
  UpdateBudgetDto,
  UpdateBudgetResponse,
} from '@/lib/types/api.types';

export const userService = {
  async updateBudget(data: UpdateBudgetDto) {
    const response = await api.put<UpdateBudgetResponse>('/api/users/budget', data);
    return response.data.user;
  },
};