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

    getSessions: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/session?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),

    deleteTutorial: builder.mutation({
      query: ({ id }) => {
        console.log(id);
        return {
          url: `/tutorial/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetTutorialsQuery,
  useGetCoursesQuery,
  useGetTopicsQuery,
  useGetSessionsQuery,
  useDeleteTutorialMutation,
} = courseApi;
