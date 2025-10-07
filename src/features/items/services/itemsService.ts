import api from '@/lib/settings/axios';
import type {
  GetItemsResponse,
  GetItemResponse,
  CreateItemDto,
  CreateItemResponse,
  UpdateItemDto,
  UpdateItemResponse,
  DeleteItemResponse,
  ItemsQueryParams,
} from '@/lib/types/api.types';

export const itemsService = {
  async getItems(params?: ItemsQueryParams) {
    const response = await api.get<GetItemsResponse>('/api/items', { params });
    return response.data.items;
  },

  async getItemById(id: string) {
    const response = await api.get<GetItemResponse>(`/api/items/${id}`);
    return response.data.item;
  },

  async createItem(data: CreateItemDto) {
    const response = await api.post<CreateItemResponse>('/api/items', data);
    return response.data.item;
  },

  async updateItem(id: string, data: UpdateItemDto) {
    const response = await api.put<UpdateItemResponse>(`/api/items/${id}`, data);
    return response.data.item;
  },

  async deleteItem(id: string) {
    const response = await api.delete<DeleteItemResponse>(`/api/items/${id}`);
    return response.data;
  },
};
