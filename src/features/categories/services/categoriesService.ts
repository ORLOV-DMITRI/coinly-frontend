import api from '@/lib/settings/axios';
import type {
  GetCategoriesResponse,
  GetCategoryResponse,
  CreateCategoryDto,
  CreateCategoryResponse,
  UpdateCategoryDto,
  UpdateCategoryResponse,
  DeleteCategoryResponse,
} from '@/lib/types/api.types';

export const categoriesService = {
  async getCategories() {
    const response = await api.get<GetCategoriesResponse>('/api/categories');
    return response.data.categories;
  },

  async getCategoryById(id: string) {
    const response = await api.get<GetCategoryResponse>(`/api/categories/${id}`);
    return response.data.category;
  },

  async createCategory(data: CreateCategoryDto) {
    const response = await api.post<CreateCategoryResponse>('/api/categories', data);
    return response.data.category;
  },

  async updateCategory(id: string, data: UpdateCategoryDto) {
    const response = await api.put<UpdateCategoryResponse>(`/api/categories/${id}`, data);
    return response.data.category;
  },

  async deleteCategory(id: string) {
    const response = await api.delete<DeleteCategoryResponse>(`/api/categories/${id}`);
    return response.data;
  },
};
