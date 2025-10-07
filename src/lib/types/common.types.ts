// ============================================================================
// COMMON TYPES - Utility types used across the application
// ============================================================================

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export type ApiResponse<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
  error?: string;
};

export type ApiResult<T> = ApiResponse<T> | ApiError;

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ID = string;

// ============================================================================
// PAGINATION TYPES (for future use)
// ============================================================================

export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ============================================================================
// DATE TYPES
// ============================================================================

export type DateRange = {
  startDate: string;
  endDate: string;
};

export type Period = 'week' | 'month' | 'year' | 'all';
