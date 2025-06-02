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
import {
  ALLCOURSESFREE,
  GETCOURSEBYID,
  GETCOURSEBYIDFREE,
} from "@/app/config/course.endpoints";
import { setCoursesFree } from "@/redux/course/course.slice";
import { Course } from "@/app/types/course";

export const useCourseQueries = (
  courseId?: string,
  noAuth?: boolean,
  needAuth?: boolean
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, isLoading } = useServerStatus();

  const commonOptions = {
    requiresAuth: false,
    enabled: !isLoading && isOnline,
  };

  // get free courses for landing page
  const {
    data: coursesFreeResponse,
    error: coursesFreeError,
    loading: coursesFreeLoading,
  } = useQueryWrapper<Course[]>({
    endpoint: ALLCOURSESFREE,
    queryKey: ["courses-free"],
    ...commonOptions,
  });

  useEffect(() => {
    if (coursesFreeResponse) {
      dispatch(setCoursesFree(coursesFreeResponse.data));
    }
  }, [coursesFreeResponse, dispatch]);

  // get a course by id
  const {
    data: courseResponse,
    error: courseError,
    loading: courseLoading,
  } = useQueryWrapper<Course>({
    endpoint: GETCOURSEBYID,
    params: `/${courseId}`,
    queryKey: [`course-${courseId}`],
    enabled: commonOptions.enabled && !!courseId && !noAuth && !!needAuth,
    requiresAuth: true,
  });

  // get a course by id(free)
  const {
    data: courseFreeResponse,
    error: courseFreeError,
    loading: courseFreeLoading,
  } = useQueryWrapper<Course>({
    endpoint: GETCOURSEBYIDFREE,
    params: `/${courseId}`,
    queryKey: [`course-${courseId}-free`],
    enabled: commonOptions.enabled && !!courseId && !!noAuth && !needAuth,
    requiresAuth: false,
  });

  // console.log('FREE')

  return {
    coursesFreeDomain: {
      data: coursesFreeResponse?.data,
      loading: coursesFreeLoading,
      error: coursesFreeError,
    },
    courseDomain: {
      data: courseResponse?.data,
      loading: courseLoading,
      error: courseError,
    },
    courseFreeDomain: {
      data: courseFreeResponse?.data,
      loading: courseLoading,
      error: courseFreeLoading,
    },
  };
};
