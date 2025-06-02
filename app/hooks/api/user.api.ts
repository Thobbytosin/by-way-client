import { useQueryWrapper } from "./useQueryWrapper";
import { useServerStatus } from "./useServerStatus";
import {
  GETADMIN,
  GETUSERSLIST,
  UPDATEAVATAR,
  UPDATEUSERINFO,
  UPDATEUSERPASSWORD,
} from "@/app/config/user.endpoints";
import { TUser, UserDetail } from "@/app/types/user";
import { useMutateData } from "./useApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useUserQueries = () => {
  const { isLoading, isOnline } = useServerStatus();

  const commonOptions = {
    requiresAuth: false,
    enabled: !isLoading && isOnline,
  };

  // user lists
  const {
    data: usersListResponse,
    error: usersListError,
    loading: usersListLoading,
  } = useQueryWrapper<UserDetail[]>({
    endpoint: GETUSERSLIST,
    queryKey: ["users-list-free"],
    ...commonOptions,
  });

  // admin
  const {
    data: adminResponse,
    error: adminError,
    loading: adminLoading,
  } = useQueryWrapper<TUser>({
    endpoint: GETADMIN,
    queryKey: ["admin"],
    ...commonOptions,
  });

  return {
    usersDomainData: {
      usersList: usersListResponse?.data || [],
      usersListLoading,
      usersListError,
    },
    adminDomainData: {
      admin: adminResponse?.data,
      adminLoading,
      adminError,
    },
  };
};

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  // updateAvatar
  const { mutate: updateProfilePicture, isPending: updateAvatarPending } =
    useMutateData<null, FormData>({
      method: "PUT",
      mutationKey: ["update-avatar"],
      url: UPDATEAVATAR,
      skipAuthRefresh: false,
      onSuccess: (response) => {
        if (!response.success) return;

        toast.success(response.message);

        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        toast.error(`${error.message}`);
      },
    });

  // update User Info
  const { mutate: updateUser } = useMutateData<
    null,
    { name?: string; email?: string }
  >({
    method: "PUT",
    mutationKey: ["update-user-info"],
    url: UPDATEUSERINFO,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // update User Info
  const { mutate: updatePassword, isPending: updatePasswordPending } =
    useMutateData<null, { oldPassword: string; newPassword: string }>({
      method: "PUT",
      mutationKey: ["update-user-password"],
      url: UPDATEUSERPASSWORD,
      skipAuthRefresh: false,
      onSuccess: (response) => {
        if (!response.success) return;

        toast.success(response.message);

        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        toast.error(`${error.message}`);
      },
    });

  return {
    infoLoading: { updateAvatarPending, updatePasswordPending },
    userInfo: { updateUser, updatePassword, updateProfilePicture },
  };
};
