import { useMutateData } from "./useApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useServerStatus } from "./useServerStatus";
import { useQueryWrapper } from "./useQueryWrapper";
import {
  GETALLNOTIFCATIONS,
  UPDATENOTIFCATIONSTATUS,
} from "@/config/notification.endpoint";
import { TNotification } from "@/types/notification.types";

export const useNotificationQueries = () => {
  const { isLoading, isOnline } = useServerStatus();

  const commonOptions = {
    requiresAuth: true,
    enabled: !isLoading && isOnline,
  };

  const {
    data: notificationsResponse,
    error: notificationsError,
    loading: notificationsLoading,
    isSuccess: notificationSuccess,
  } = useQueryWrapper<TNotification[]>({
    endpoint: GETALLNOTIFCATIONS,
    queryKey: [`get-all-notifications`],
    ...commonOptions,
  });

  return {
    notificationsDomain: {
      notifications: notificationsResponse?.data || [],
      notificationsError,
      notificationsLoading,
      notificationSuccess,
    },
  };
};

export const useNotificationMutations = () => {
  const queryClient = useQueryClient();
  // update notification status
  const {
    mutate: updateNotificationStatus,
    isSuccess: updateNotificationStatusSuccess,
    isPending: updateNotificationStatusPending,
  } = useMutateData<null, { notificationId: string }>({
    method: "PUT",
    mutationKey: ["update-notification-status"],
    url: UPDATENOTIFCATIONSTATUS,
    paramKey: "notificationId",
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["get-all-notifications"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return {
    updateNotificationDomain: {
      updateNotificationStatus,
      updateNotificationStatusSuccess,
      updateNotificationStatusPending,
    },
  };
};
