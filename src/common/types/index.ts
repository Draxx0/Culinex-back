export interface AppReturnObject<T = unknown> {
  status: number;
  message?: string;
  data?: T;
}
