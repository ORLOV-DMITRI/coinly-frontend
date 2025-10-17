import api from '@/lib/settings/axios';
import type {
  GetShoppingListsResponse,
  GetShoppingListResponse,
  CreateShoppingListDto,
  CreateShoppingListResponse,
  UpdateShoppingListDto,
  UpdateShoppingListResponse,
  DeleteShoppingListResponse,
  AddItemToShoppingListDto,
  AddItemToShoppingListResponse,
  UpdateShoppingListItemDto,
  UpdateShoppingListItemResponse,
  RemoveItemFromShoppingListResponse,
  CompleteShoppingListResponse,
} from '@/lib/types/api.types';

export const shoppingListsService = {
  async getShoppingLists() {
    const response = await api.get<GetShoppingListsResponse>('/api/shopping-lists');
    return response.data.shoppingLists;
  },

  async getShoppingListById(id: string) {
    const response = await api.get<GetShoppingListResponse>(`/api/shopping-lists/${id}`);
    return response.data.shoppingList;
  },

  async createShoppingList(data: CreateShoppingListDto) {
    const response = await api.post<CreateShoppingListResponse>('/api/shopping-lists', data);
    return response.data.shoppingList;
  },

  async updateShoppingList(id: string, data: UpdateShoppingListDto) {
    const response = await api.put<UpdateShoppingListResponse>(`/api/shopping-lists/${id}`, data);
    return response.data.shoppingList;
  },

  async deleteShoppingList(id: string) {
    const response = await api.delete<DeleteShoppingListResponse>(`/api/shopping-lists/${id}`);
    return response.data;
  },

  async addItemToShoppingList(listId: string, data: AddItemToShoppingListDto) {
    const response = await api.post<AddItemToShoppingListResponse>(
      `/api/shopping-lists/${listId}/items`,
      data
    );
    return response.data.shoppingListItem;
  },

  async updateShoppingListItem(listId: string, itemId: string, data: UpdateShoppingListItemDto) {
    const response = await api.put<UpdateShoppingListItemResponse>(
      `/api/shopping-lists/${listId}/items/${itemId}`,
      data
    );
    return response.data.shoppingListItem;
  },

  async removeItemFromShoppingList(listId: string, itemId: string) {
    const response = await api.delete<RemoveItemFromShoppingListResponse>(
      `/api/shopping-lists/${listId}/items/${itemId}`
    );
    return response.data;
  },

  async completeShoppingList(id: string) {
    const response = await api.post<CompleteShoppingListResponse>(
      `/api/shopping-lists/${id}/complete`
    );
    return response.data;
  },
};