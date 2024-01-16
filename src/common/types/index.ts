export interface ApiCommonResponse<T = unknown> {
  status: number;
  message?: string;
  data?: T;
}
