import api from '@/lib/settings/axios';
import {AuthResponse, User, UpdateSettingsDto, UpdateSettingsResponse} from "@/lib/types/api.types";
import Cookies from 'js-cookie';

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

  async updateSettings(data: UpdateSettingsDto): Promise<UpdateSettingsResponse> {
    const response = await api.put('/api/auth/settings', data);
    return response.data;
  },

  logout(): void {
    Cookies.remove('auth_token');
  },

  setToken(token: string): void {
    Cookies.set('auth_token', token, {
      expires: 30,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production'
    });
  },

  getToken(): string | undefined {
    return Cookies.get('auth_token');
  }
};