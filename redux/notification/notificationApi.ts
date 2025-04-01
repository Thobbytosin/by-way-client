import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all notifications
    getAllNotifications: builder.query({
      query: () => ({
        url: "/get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // update notifications status
    updateNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `/update-notification-status/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationApi;
