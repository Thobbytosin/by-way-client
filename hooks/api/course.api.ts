import { useEffect } from "react";
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
  CREATECOURSE,
  DELETECOURSEBYID,
  EDITCOURSEBYID,
  GETALLCOURSESADMIN,
  GETCOURSEBYID,
  GETCOURSEBYIDFREE,
  GETCOURSECONTENTBYID,
} from "@/config/course.endpoints";
import { setCoursesFree } from "@/redux/course/course.slice";
import { Course, CourseData, CourseQueryOptions } from "@/types/course.types";
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

  // get all courses - admin
  const {
    data: allCoursesResponse,
    error: allCoursesError,
    loading: allCoursesLoading,
  } = useQueryWrapper<Course[]>({
    endpoint: GETALLCOURSESADMIN,
    queryKey: ["all-courses-admin"],
    enabled: commonEnabled && options.type === "all-courses",
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
    allCoursesDomain: {
      ...(options.type === "all-courses" && {
        allCourses: allCoursesResponse?.data,
        allCoursesLoading: allCoursesLoading,
        allCoursesError: allCoursesError,
      }),
    },
  };
};

export const useCourseMutations = (courseId?: string) => {
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

  // delete course
  const {
    mutate: deleteCourse,
    isSuccess: deleteCourseSuccess,
    isPending: deleteCoursePending,
  } = useMutateData<null, { courseId: string }>({
    method: "DELETE",
    mutationKey: [`delete-course-${courseId}`],
    url: DELETECOURSEBYID,
    paramKey: "courseId",
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["all-courses-admin"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // create course
  const {
    mutate: createCourse,
    isSuccess: createCourseSuccess,
    isPending: createCoursePending,
  } = useMutateData<null, FormData>({
    method: "POST",
    mutationKey: [`create-course`],
    url: CREATECOURSE,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;
      toast.success(response.message);

      queryClient.invalidateQueries({ queryKey: ["courses-free"] });

      queryClient.invalidateQueries({ queryKey: ["all-courses-admin"] });
    },
    onError: (error) => {
      toast.error(`${error.message}`);
    },
  });

  // edit course
  const {
    mutate: updateCourse,
    isSuccess: updateCourseSuccess,
    isPending: updateCoursePending,
  } = useMutateData<null, FormData>({
    method: "PUT",
    mutationKey: [`update-course-${courseId}`],
    url: EDITCOURSEBYID,
    params: `/${courseId}`,
    skipAuthRefresh: false,
    onSuccess: (response) => {
      if (!response.success) return;

      toast.success(response.message);

      queryClient.invalidateQueries({
        queryKey: [`course-${courseId}`],
      });

      queryClient.invalidateQueries({
        queryKey: ["all-courses-admin"],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(`${error.message}`);
    },
  });

  return {
    courseInfoPending: {
      submitQuestionPending,
      submitRepyToQuestionPending,
      submitReviewPending,
      submitReviewReplyPending,
      deleteCoursePending,
      createCoursePending,
      updateCoursePending,
    },
    courseInfo: {
      submitQuestion,
      submitRepyToQuestion,
      submitReview,
      submitReviewReply,
      deleteCourse,
      createCourse,
      updateCourse,
    },
    courseInfoSuccess: {
      submitQuestionSuccess,
      submitRepyToQuestionSuccess,
      submitReviewSuccess,
      submitReviewReplySuccess,
      deleteCourseSuccess,
      createCourseSuccess,
      updateCourseSuccess,
    },
  };
};
