import { useEffect, useState } from "react";
import { useQueryWrapper } from "./useQueryWrapper";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useServerStatus } from "./useServerStatus";
import {
  ADDCOURSEREVIEWBYID,
  ADDQUESTION,
  ADDREPLTYTOCOURSEREVIEWBYID,
  ADDREPLYTOQUESTION,
  ALLCOURSESFREE,
  GETCOURSEBYID,
  GETCOURSEBYIDFREE,
  GETCOURSECONTENTBYID,
} from "@/config/course.endpoints";
import { setCoursesFree } from "@/redux/course/course.slice";
import { Course, CourseData, CourseQueryOptions } from "@/types/course";
import { useQueryClient } from "@tanstack/react-query";
import { useMutateData } from "./useApi";
import toast from "react-hot-toast";

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

  // get a course content by id
  const {
    data: courseContentResponse,
    error: courseContentError,
    loading: courseContentLoading,
    isSuccess: courseContentSuccess,
  } = useQueryWrapper<CourseData[]>({
    endpoint: GETCOURSECONTENTBYID,
    params: `/${options.courseId}`,
    queryKey: [`course-content-${options.courseId}`],
    enabled: commonEnabled && options.type === "course-content",
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
    courseContentDomain: {
      ...(options.type === "course-content" && {
        courseData: courseContentResponse?.data,
        courseDataLoading: courseContentLoading,
        courseDataError: courseContentError,
      }),
    },
  };
};

export const useCourseMutations = (courseId: string) => {
  const queryClient = useQueryClient();

  // add question
  const {
    mutate: submitQuestion,
    isSuccess: submitQuestionSuccess,
    isPending: submitQuestionPending,
  } = useMutateData<
    null,
    { question: string; contentId: any; courseId: string }
  >({
    method: "PUT",
    mutationKey: [`update-course-${courseId}-question`],
    url: ADDQUESTION,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [`course-content-${courseId}`],
      });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // add reply question
  const {
    mutate: submitRepyToQuestion,
    isSuccess: submitRepyToQuestionSuccess,
    isPending: submitRepyToQuestionPending,
  } = useMutateData<
    null,
    { answer: string; questionId: string; contentId?: string; courseId: string }
  >({
    method: "PUT",
    mutationKey: [`update-course-${courseId}-reply`],
    url: ADDREPLYTOQUESTION,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [`course-content-${courseId}`],
      });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // add course review
  const {
    mutate: submitReview,
    isSuccess: submitReviewSuccess,
    isPending: submitReviewPending,
  } = useMutateData<null, { rating: number; review: string }>({
    method: "PUT",
    mutationKey: [`update-course-${courseId}-review`],
    url: ADDCOURSEREVIEWBYID,
    params: `/${courseId}`,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [`course-${courseId}`],
      });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // add course review reply (admin)
  const {
    mutate: submitReviewReply,
    isSuccess: submitReviewReplySuccess,
    isPending: submitReviewReplyPending,
  } = useMutateData<null, { reply: string; reviewId: string }>({
    method: "PUT",
    mutationKey: [`update-course-${courseId}-review-reply`],
    url: ADDREPLTYTOCOURSEREVIEWBYID,
    params: `/${courseId}`,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      queryClient.invalidateQueries({
        queryKey: [`course-${courseId}`],
      });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  return {
    courseInfoPending: {
      submitQuestionPending,
      submitRepyToQuestionPending,
      submitReviewPending,
      submitReviewReplyPending,
    },
    courseInfo: {
      submitQuestion,
      submitRepyToQuestion,
      submitReview,
      submitReviewReply,
    },
    courseInfoSuccess: {
      submitQuestionSuccess,
      submitRepyToQuestionSuccess,
      submitReviewSuccess,
      submitReviewReplySuccess,
    },
  };
};
