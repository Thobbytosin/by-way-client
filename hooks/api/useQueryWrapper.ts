import { useFetchData } from "./useApi";

interface QueryOptions {
  endpoint: string;
  queryKey: string[];
  requiresAuth?: boolean;
  params?: string;
  enabled: boolean;
}

export const useQueryWrapper = <T = any>({
  endpoint,
  queryKey,
  params,
  requiresAuth = false,
  enabled,
}: QueryOptions) => {
  const url = params ? `${endpoint}${params}` : endpoint;

  const { data, error, isLoading, isSuccess, isFetching, isFetched } =
    useFetchData<T>({
      method: "GET",
      queryKey: [...queryKey],
      url,
      skipAuthRefresh: !requiresAuth, // check if token is needed
      enabled,
      // enabled: hasBeenAuthenticated && isOnline,
    });

  return {
    error,
    loading: isLoading || !isFetched,
    data,
    isSuccess,
    isFetching,
  };
};
