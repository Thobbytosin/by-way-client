import { useQueryWrapper } from "./useQueryWrapper";
import { useServerStatus } from "./useServerStatus";
import {
  GETADMIN,
  GETUSERSLIST,
  UPDATEAVATAR,
  UPDATEUSERINFO,
  UPDATEUSERPASSWORD,
  UPDATEVIEWEDLESSON,
} from "@/config/user.endpoints";
import { TUser, UserDetail } from "@/types/user";
import { useMutateData } from "./useApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useUserQueries = (options: { type: "user-lists" | "admin" }) => {
  const { isLoading, isOnline } = useServerStatus();

  const commonEnabled = !isLoading && isOnline;

  // user lists
  const {
    data: usersListResponse,
    error: usersListError,
    loading: usersListLoading,
  } = useQueryWrapper<UserDetail[]>({
    endpoint: GETUSERSLIST,
    queryKey: ["users-list-free"],
    enabled: commonEnabled && options.type === "user-lists",
  });

  // admin
  const {
    data: adminResponse,
    error: adminError,
    loading: adminLoading,
  } = useQueryWrapper<TUser>({
    endpoint: GETADMIN,
    queryKey: ["admin"],
    enabled: commonEnabled && options.type === "admin",
  });

  return {
    usersDomainData: {
      ...(options.type === "user-lists" && {
        usersList: usersListResponse?.data || [],
        usersListLoading,
        usersListError,
      }),
    },
    adminDomainData: {
      ...(options.type === "admin" && {
        admin: adminResponse?.data,
        adminLoading,
        adminError,
      }),
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

  // update User viewed courses
  const { mutate: updateViewedLesson, isSuccess: updateViewedLessonSuccess } =
    useMutateData<null, { courseId: string; videoId: string }>({
      method: "PUT",
      mutationKey: ["update-user-viewed-courses"],
      url: UPDATEVIEWEDLESSON,
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
    userInfo: {
      updateUser,
      updatePassword,
      updateProfilePicture,
      updateViewedLesson,
    },
    userInfoSuccess: { updateViewedLessonSuccess },
  };
};
