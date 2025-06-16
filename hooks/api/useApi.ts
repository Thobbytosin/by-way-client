import { SERVER_URI } from "@/config/api";
import { ApiError, ApiResponse } from "@/types/api.types";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

interface FetchOptions {
  url: string;
  method: "GET";
  queryKey: (string | number)[];
  headers?: Record<string, string>;
  enabled?: boolean;
  staleTime?: number;
  skipAuthRefresh?: boolean;
}

// for GET requests
export function useFetchData<T>({
  url,
  queryKey,
  method,
  headers,
  enabled = false,
  skipAuthRefresh = false,
  staleTime = 1000 * 60 * 5,
}: FetchOptions) {
  return useQuery<ApiResponse<T>, ApiError>({
    queryKey: [...queryKey],
    queryFn: async () => {
      try {
        const config = {
          method,
          url: `${SERVER_URI}${url}`,
          withCredentials: true,
          headers: headers || {},
          skipAuthRefresh,
        };

        const response = await axiosInstance<ApiResponse<T>>(config);

        // validate response shape
        if (!response.data || typeof response.data.success !== "boolean") {
          throw {
            success: false,
            message: "Invalid API response structure",
            statusCode: 500,
          } satisfies ApiError;
        }

        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.data) {
          const data = error.response.data;
          throw {
            success: false,
            message: data.message || "Unknown error",
            statusCode: data.statusCode || error.response.status,
          } satisfies ApiError;
        }

        throw {
          success: false,
          message: error.message || "Unexpected error",
          statusCode: 500,
        } satisfies ApiError;
      }
    },
    staleTime,
    enabled,
    retry: (failureCount, error) => {
      if ([401, 404].includes(error.statusCode || 0)) return false;
      return failureCount < 2;
    },
  });
}

// FOR POST, PUT, DELETE requests
interface MutationOptions<TResponse, TRequest = unknown> {
  mutationKey: (string | number)[];
  url: string;
  method: "POST" | "PUT" | "DELETE";
  params?: string;
  paramKey?: keyof TRequest;
  headers?: Record<string, string>;
  skipAuthRefresh?: boolean;
  onSuccess: (data: ApiResponse<TResponse>) => void;
  onError: (error: ApiError) => void;
}

export function useMutateData<TResponse, TRequest = unknown>({
  url,
  method,
  headers,
  mutationKey,
  skipAuthRefresh = true,
  params,
  paramKey,
  onSuccess,
  onError,
}: MutationOptions<TResponse, TRequest>) {
  return useMutation<ApiResponse<TResponse>, ApiError, TRequest>({
    mutationKey: [...mutationKey],
    mutationFn: async (data: TRequest) => {
      let dynamicParams = params;

      if (
        paramKey &&
        typeof data === "object" &&
        data !== null &&
        paramKey &&
        paramKey in data
      ) {
        const key = paramKey as string;
        const value = (data as Record<string, any>)[key];
        dynamicParams = `/${value}`;
      }

      const config = {
        method,
        url: dynamicParams
          ? `${SERVER_URI}${url}${dynamicParams}`
          : `${SERVER_URI}${url}`,
        data,
        withCredentials: true,
        headers: headers || {},
        skipAuthRefresh,
      };
      const response = await axiosInstance<ApiResponse<TResponse>>(config);

      // check if response structure is correct
      if (!response.data || typeof response.data.success !== "boolean") {
        throw {
          success: false,
          message: "Invalid API response structure",
          statusCode: 500,
        } satisfies ApiError;
      }

      return response.data;
    },
    onSuccess: (data) => {
      if (!data.success) {
        onError(data as ApiError);
        return;
      }

      onSuccess(data);
    },
    onError: (error: AxiosError<ApiError> | ApiError) => {
      const apiError = axios.isAxiosError(error)
        ? error?.response?.data || {
            success: false,
            message: error.message,
            statusCode: error.response?.status || 500,
          }
        : error;

      onError(apiError);
    },
  });
}
