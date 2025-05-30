import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // update user avatar
    updateAvatar: builder.mutation({
      query: (avatar: any) => ({
        url: "/update-profile-picture",
        method: "PUT",
        headers: {},
        body: avatar,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("USER PROFILE PICTURE UPLOADED SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR GETTING USER PROFILE PICTURE:", error);
        }
      },
    }),

    // update user name or email or both
    updateUserInfo: builder.mutation({
      query: (info: any) => ({
        url: "/update-user-info",
        method: "PUT",
        body: info,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("USER INFO UPDATED SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR UPDATING USER INFO:", error);
        }
      },
    }),

    // update user password
    updateUserPassword: builder.mutation({
      query: (data: any) => ({
        url: "/update-user-password",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("USER INFO PASSWORD:");
        } catch (error: any) {
          // console.log("ERROR UPDATING USER INFO:", error);
        }
      },
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => ({
        url: "/get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("ALL USERS GOTTEN SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR FETCHING ALL USERS:", error);
        }
      },
    }),

    // get all admins
    getAllAdmins: builder.query({
      query: () => ({
        url: "/get-all-admins",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // update user role
    updateUserRole: builder.mutation({
      query: (data) => ({
        url: "/update-user-role",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("USER ROLE UPDATED SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR UPDATING USER ROLE:", error);
        }
      },
    }),

    // delete user account
    deleteUserAccount: builder.mutation({
      query: (userId) => ({
        url: `/delete-user/${userId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          console.log("USER ACCOUNT DELETED");
        } catch (error: any) {
          console.log("ERROR DELETING USER ACCOUNT", error);
        }
      },
    }),

    // update videos viewed
    updateUserVideosViewed: builder.mutation({
      query: ({ courseId, videoId }) => ({
        url: `/update-user-videos-viewed`,
        method: "PUT",
        body: { courseId, videoId },
        credentials: "include" as const,
      }),
    }),

    // get user role
    getUserLatest: builder.query({
      query: () => ({
        url: `/get-users-latest`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserAccountMutation,
  useGetAllAdminsQuery,
  useUpdateUserVideosViewedMutation,
  useGetUserLatestQuery,
} = userApi;
