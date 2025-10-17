import { apiClient } from './client';
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  TodoQueryParams,
  PaginatedResponse
} from '@/types';

export const todosApi = {
  /**
   * Get all todos with filtering, pagination, and search
   */
  getAll: async (params?: TodoQueryParams): Promise<PaginatedResponse<Todo>> => {
    const response = await apiClient.get<PaginatedResponse<Todo>>('/todos', params);
    return response.content;
  },

  /**
   * Create a new todo
   */
  create: async (todo: CreateTodoRequest): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', todo);
    return response.content;
  },

  /**
   * Mark todo as done or undone
   */
  mark: async (id: string, action: 'DONE' | 'UNDONE'): Promise<Todo> => {
    const response = await apiClient.put<Todo>(`/todos/${id}/mark`, { action });
    return response.content;
  },

  /**
   * Delete a todo by ID
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};
