import { baseApi } from "../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollmentFeeList: builder.query({
      query: ({ limit, page, searchTerm }) => {
        return {
          url: `/academic-fee?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
    }),

    getSellingList: builder.query({
      query: ({ limit, page, searchTerm }) => {
        return {
          url: `/order?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetEnrollmentFeeListQuery, useGetSellingListQuery } =
  paymentApi;
