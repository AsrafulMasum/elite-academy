import { baseApi } from "../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollmentFeeList: builder.query({
      query: ({ limit, page }) => {
        return {
          url: `/academic-fee?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetEnrollmentFeeListQuery } = paymentApi;
