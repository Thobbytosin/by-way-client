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

export const useCourseQueries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, isLoading } = useServerStatus();

  const commonOptions = {
    requiresAuth: false,
    enabled: !isLoading && isOnline,
  };

  const {
    data: coursesFreeResponse,
    error: coursesFreeError,
    loading: coursesFreeLoading,
  } = useQueryWrapper<ApiResponse<CoursesFree[]>>({
    endpoint: ALLCOURSESFREE,
    queryKey: ["courses-free"],
    ...commonOptions,
  });

  useEffect(() => {
    if (coursesFreeResponse) {
      dispatch(setCoursesFree(coursesFreeResponse.data));
    }
  }, [coursesFreeResponse, dispatch]);

  return {
    coursesDomainData: { coursesFree: coursesFreeResponse?.data },
    coursesDomainLoading: { coursesFreeLoading },
    coursesDomainError: { coursesFreeError },
  };
};
