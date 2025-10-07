'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from './authService';
import {User} from "@/lib/types/api.types";

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token && !!user;

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