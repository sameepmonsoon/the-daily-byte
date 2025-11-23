export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
  error: string | null;
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: {
    totalPages: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalCount: number;
  };
}
