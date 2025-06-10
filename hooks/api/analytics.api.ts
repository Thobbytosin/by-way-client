import { useServerStatus } from "./useServerStatus";
import { useQueryWrapper } from "./useQueryWrapper";
import {
  GETCOURSESANALYTICS,
  GETORDERSANALYTICS,
  GETUSERSANALYTICS,
} from "@/config/analytics.endpoint";
import { AnalyticsQueryOptions, MonthData } from "@/types/analytics.types";

export const useAnalyticsQueries = (options: AnalyticsQueryOptions) => {
  const { isLoading, isOnline } = useServerStatus();

  const commonEnabled = !isLoading && isOnline;

  //   orders analytics
  const {
    data: ordersAnalyticsResponse,
    error: ordersAnalyticsError,
    loading: ordersAnalyticsLoading,
  } = useQueryWrapper<{ last12Months: MonthData[] }>({
    endpoint: GETORDERSANALYTICS,
    queryKey: [`orders-analytics`],
    enabled: commonEnabled && options.type === "orders",
    requiresAuth: true,
  });

  //   courses analytics
  const {
    data: coursesAnalyticsResponse,
    error: coursesAnalyticsError,
    loading: coursesAnalyticsLoading,
  } = useQueryWrapper<{ last12Months: MonthData[] }>({
    endpoint: GETCOURSESANALYTICS,
    queryKey: [`courses-analytics`],
    enabled: commonEnabled && options.type === "courses",
    requiresAuth: true,
  });

  //   users analytics
  const {
    data: usersAnalyticsResponse,
    error: usersAnalyticsError,
    loading: usersAnalyticsLoading,
  } = useQueryWrapper<{ last12Months: MonthData[] }>({
    endpoint: GETUSERSANALYTICS,
    queryKey: [`users-analytics`],
    enabled: commonEnabled && options.type === "users",
    requiresAuth: true,
  });

  return {
    ordersAnalyticsDomain: {
      ...(options.type === "orders" && {
        ordersAnalytics: ordersAnalyticsResponse?.data,
        ordersAnalyticsError,
        ordersAnalyticsLoading,
      }),
    },
    coursesAnalyticsDomain: {
      ...(options.type === "courses" && {
        coursesAnalytics: coursesAnalyticsResponse?.data,
        coursesAnalyticsError,
        coursesAnalyticsLoading,
      }),
    },
    usersAnalyticsDomain: {
      ...(options.type === "users" && {
        usersAnalytics: usersAnalyticsResponse?.data,
        usersAnalyticsError,
        usersAnalyticsLoading,
      }),
    },
  };
};
