import { baseApi } from "../api/baseApi";

const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/get-bookings",
        };
      },
    }),
  }),
});

export const { useGetBookingsQuery } = bookingsApi;
