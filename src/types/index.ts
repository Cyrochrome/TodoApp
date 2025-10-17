// API Response Types
export interface ApiResponse<T> {
  content: T;
  message: string;
  errors: string[];
}

export interface PaginatedResponse<T> {
  entries: T[];
  totalData: number;
  totalPage: number;
}

// Todo Types
export interface Todo {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  item: string;
}

export interface UpdateTodoRequest {
  action: 'DONE' | 'UNDONE';
}

// Query Parameters
export interface TodoQueryParams {
  filters?: Record<string, any>;
  searchFilters?: Record<string, string>;
  rangedFilters?: Array<{
    key: string;
    start: number;
    end: number;
  }>;
  page?: number;
  rows?: number;
  orderKey?: string;
  orderRule?: 'asc' | 'desc';
}

// Authentication Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

// Store Types
export interface AuthState {
  user: AuthResponse['user'] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}
