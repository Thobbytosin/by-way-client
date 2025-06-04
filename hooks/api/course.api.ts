import { useEffect, useState } from "react";
import { useQueryWrapper } from "./useQueryWrapper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useServerStatus } from "./useServerStatus";
import {
  ALLCOURSESFREE,
  GETCOURSEBYID,
  GETCOURSEBYIDFREE,
} from "@/config/course.endpoints";
import { setCoursesFree } from "@/redux/course/course.slice";
import { Course, CourseQueryOptions } from "@/types/course";

export const useCourseQueries = (options: CourseQueryOptions) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOnline, isLoading } = useServerStatus();

  const commonEnabled = !isLoading && isOnline;

  // get free courses for landing page
  const {
    data: coursesFreeResponse,
    error: coursesFreeError,
    loading: coursesFreeLoading,
  } = useQueryWrapper<Course[]>({
    endpoint: ALLCOURSESFREE,
    queryKey: ["courses-free"],
    enabled: commonEnabled && options.type === "free-list",
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
    params: `/${options.courseId}`,
    queryKey: [`course-${options.courseId}`],
    enabled: commonEnabled && options.type === "auth-course",
    requiresAuth: true,
  });

  // get a course by id(free)
  const {
    data: courseFreeResponse,
    error: courseFreeError,
    loading: courseFreeLoading,
    isFetching: courseFreeFetching,
  } = useQueryWrapper<Course>({
    endpoint: GETCOURSEBYIDFREE,
    params: `/${options.courseId}`,
    queryKey: [`course-${options.courseId}-free`],
    enabled: commonEnabled && options.type === "free-course",
  });

  return {
    coursesFreeDomain: {
      ...(options.type === "free-list" && {
        courses: coursesFreeResponse?.data,
        coursesLoading: coursesFreeLoading,
        coursesError: coursesFreeError,
      }),
    },
    courseDomain: {
      ...(options.type === "auth-course" && {
        course: courseResponse?.data,
        courseLoading: courseLoading,
        courseError: courseError,
      }),
    },
    courseFreeDomain: {
      ...(options.type === "free-course" && {
        course: courseFreeResponse?.data,
        courseLoading: courseFreeLoading,
        courseError: courseFreeError,
        courseFetching: courseFreeFetching,
      }),
    },
  };
};
