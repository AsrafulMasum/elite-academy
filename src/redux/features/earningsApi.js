import { baseApi } from "../api/baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: (page) => {
        return {
          url: `/order/admin-orders?page=${page}&status=Delivered`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetEarningsQuery } = earningsApi;
