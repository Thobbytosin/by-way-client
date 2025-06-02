export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
};

export type ApiError = ApiResponse & { success: false };

export type ApiSuccess<T> = ApiResponse<T> & {
  success: true;
  data: T;
};
