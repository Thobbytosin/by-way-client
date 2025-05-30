import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // create a new course
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("COURSE CREATED SUCCESSFULLY");
        } catch (error: any) {
          console.log("ERROR CREATING COURSE:", error);
        }
      },
    }),

    // get all courses
    getAllCourses: builder.query({
      query: () => ({
        url: "/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("ALL COURSES GOTTEN SUCCESSFULLY");
        } catch (error: any) {}
      },
    }),

    // get all courses without purchase
    getAllCoursesWithoutPurchase: builder.query({
      query: () => ({
        url: "/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("ALL COURSES GOTTEN SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR GETTING ALL COURSES:", error);
        }
      },
    }),

    // delete a course
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/delete-course/${courseId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("COURSE DELETED");
        } catch (error: any) {
          // console.log("ERROR DELETING COURSE", error);
        }
      },
    }),

    // editing a course
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("COURSE EDITED");
        } catch (error: any) {
          // console.log("ERROR EDITING COURSE", error);
        }
      },
    }),

    // get a course by id
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("COURSE DETAILS FETCHED");
        } catch (error: any) {
          // console.log("ERROR FETCHING COURSE DETAILS", error);
        }
      },
    }),

    // get course content data
    getCourseContentData: builder.query({
      query: (courseId) => ({
        url: `/get-course-content/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // add question
    addQuestion: builder.mutation({
      query: (form) => ({
        url: "/add-question",
        method: "PUT",
        body: form,
        credentials: "include" as const,
      }),
    }),

    // add reply to a question
    addReplyToQuestion: builder.mutation({
      query: (form) => ({
        url: "/add-answer",
        method: "PUT",
        body: form,
        credentials: "include" as const,
      }),
    }),

    // add review
    addReview: builder.mutation({
      query: (form) => ({
        url: `/add-review/${form.courseId}`,
        method: "PUT",
        body: form,
        credentials: "include" as const,
      }),
    }),

    // add reply to a review
    addReplyToReview: builder.mutation({
      query: (form) => ({
        url: "/add-reply-review",
        method: "PUT",
        body: form,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useGetCourseDetailsQuery,
  useGetAllCoursesWithoutPurchaseQuery,
  useGetCourseContentDataQuery,
  useAddQuestionMutation,
  useAddReplyToQuestionMutation,
  useAddReviewMutation,
  useAddReplyToReviewMutation,
} = courseApi;
