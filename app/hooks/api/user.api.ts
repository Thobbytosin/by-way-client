import { useEffect, useState } from "react";
import { isServerOnline } from "@/app/utils/isServerOnline";
import { GETLAYOUTTYPE } from "@/app/config/layout.endpoints";
import { useQueryWrapper } from "./useQueryWrapper";
import {
  BannerContent,
  CategoriesContent,
  FAQsContent,
} from "@/app/types/content";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useServerStatus } from "./useServerStatus";
import { ALLCOURSESFREE } from "@/app/config/course.endpoints";
import { setCoursesFree } from "@/redux/course/course.slice";
import { ApiResponse } from "@/app/types/api";
import { CoursesFree } from "@/app/types/course";
import { GETUSERSLIST } from "@/app/config/user.endpoints";
import { UserDetail, UserList } from "@/app/types/user";

export const useUserQueries = () => {
  const isMounted = typeof document !== "undefined";
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const canFetchUser: boolean = useServerStatus();

  useEffect(() => {
    const checkServer = async () => {
      if (isMounted) {
        setIsOnline(await isServerOnline());
      }
    };

    checkServer();
  }, [isMounted]);

  const commonOptions = { requiresAuth: false, enabled: isMounted && isOnline };

  const {
    data: usersListResponse,
    error: usersListError,
    loading: usersListLoading,
  } = useQueryWrapper<UserDetail[]>({
    endpoint: GETUSERSLIST,
    queryKey: ["users-list-free"],
    ...commonOptions,
  });

  return {
    usersDomainData: { usersList: usersListResponse?.data || [] },
    usersDomainLoading: { usersListLoading },
    usersDomainError: { usersListError },
  };
};
