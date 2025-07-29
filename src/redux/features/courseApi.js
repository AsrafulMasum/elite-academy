import { baseApi } from "../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTutorials: builder.query({
      query: () => {
        return {
          url: "/tutorial",
          method: "GET",
        };
      },
    }),

    getCourses: builder.query({
      query: () => {
        return {
          url: "/course",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTutorialsQuery, useGetCoursesQuery } = courseApi;
