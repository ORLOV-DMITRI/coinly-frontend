'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from './authService';
import { userService } from '@/shared/services/userService';
import { User, UpdateBudgetDto } from "@/lib/types/api.types";
import toast from 'react-hot-toast';

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateBudget: (monthlyBudget: number) => void;
  isUpdatingBudget: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const queryClient = useQueryClient();

  const isAuthenticated = !!token && !!user;

  const updateBudgetMutation = useMutation({
    mutationFn: (data: UpdateBudgetDto) => userService.updateBudget(data),
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      toast.success('Бюджет обновлён');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления бюджета');
    },
  });

  const login = (newToken: string, newUser: User) => {
    authService.setToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const initAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlToken = urlParams.get('token');

      if (urlToken) {
        authService.setToken(urlToken);
        setToken(urlToken);
        try {
          const userData = await authService.getProfile();
          setUser(userData);
          window.history.replaceState({}, '', window.location.pathname);
        } catch (error) {
          authService.logout();
          setToken(null);
        }
      } else {
        const savedToken = authService.getToken();
        if (savedToken) {
          setToken(savedToken);
          try {
            const userData = await authService.getProfile();
            setUser(userData);
          } catch (error) {
            authService.logout();
            setToken(null);
          }
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      isAuthenticated,
      login,
      logout,
      updateBudget: (monthlyBudget: number) => updateBudgetMutation.mutate({ monthlyBudget }),
      isUpdatingBudget: updateBudgetMutation.isPending,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}