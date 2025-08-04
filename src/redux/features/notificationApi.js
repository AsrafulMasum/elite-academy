import { baseApi } from "../api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (page) => {
        return {
          url: `/notification?limit=7&page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["notifications"],
    }),

    readNotification: builder.mutation({
      query: () => {
        return {
          url: "/notification",
          method: "PATCH",
        };
      },
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationApi;
