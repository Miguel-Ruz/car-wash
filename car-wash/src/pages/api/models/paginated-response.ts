export interface PaginatedResponse<T> {
  page: number;
  size: number;
  total: number;
  data: T[];
}