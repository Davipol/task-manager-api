export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}
export const successResponse = <T>(data: T): ApiResponse<T> => {
  return { success: true, data: data, timestamp: Date.now() };
};

export const errorResponse = (message: string): ApiResponse<never> => {
  return {
    success: false,
    error: message,
    timestamp: Date.now(),
  };
};
