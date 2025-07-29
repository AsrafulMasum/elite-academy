import { baseApi } from "../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTutorials: builder.query({
      query: ({ page, limit }) => {
        console.log(page, limit);
        return {
          url: `/tutorial?page=${page}&limit=${limit}`,
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

    getTopics: builder.query({
      query: () => {
        return {
          url: "/topic",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetTutorialsQuery, useGetCoursesQuery, useGetTopicsQuery } =
  courseApi;
