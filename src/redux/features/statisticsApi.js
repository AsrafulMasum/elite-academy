import { baseApi } from "../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    statistics: builder.query({
      query: (year) => {
        return {
          url: `/dashboard?userYear=${year?.userYear}&sellerYear=${year?.sellerYear}`,
          method: "GET",
        };
      },
    }),

    analytics: builder.query({
      query: (year) => {
        return {
          url: `/dashboard/analytics?userYear=${year?.userYear}&sellerYear=${year?.sellerYear}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useStatisticsQuery, useAnalyticsQuery } = statisticsApi;
