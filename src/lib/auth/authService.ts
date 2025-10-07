import api from '@/lib/settings/axios';
import {AuthResponse, User} from "@/lib/types/api.types";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  name: string;
};


export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post('/api/auth/register', credentials);
    return response.data;
  },

  async getProfile(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data.user;
  },

  logout(): void {
    localStorage.removeItem('token');
  }
};