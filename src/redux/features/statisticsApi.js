import { baseApi } from "../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    statistics: builder.query({
      query: (year) => {
        return {
          url: `/dashboard/analytics?year=${year?.userYear}&sellYear=${year?.sellerYear}&studentYear=${year?.studentYear}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useStatisticsQuery } = statisticsApi;
