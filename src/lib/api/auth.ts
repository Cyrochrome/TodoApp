import { apiClient } from './client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types';

export const authApi = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

    if (response.content.token) {
      apiClient.setToken(response.content.token);
    }

    return response.content;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);

    if (response.content.token) {
      apiClient.setToken(response.content.token);
    }

    return response.content;
  },

  /**
   * Logout user (client-side only)
   */
  logout: (): void => {
    apiClient.removeToken();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return apiClient.getToken() !== null;
  },

  /**
   * Get current auth token
   */
  getToken: (): string | null => {
    return apiClient.getToken();
  },
};
