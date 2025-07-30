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
      query: (searchTerm = "") => {
        console.log("builder", searchTerm);
        return {
          url: `/course?searchTerm=${searchTerm}`,
          method: "GET",
        };
      },
    }),

    addCourse: builder.mutation({
      query: (data)=>{
        return {
          url: "/course",
          method: "POST",
          body: data
        }
      }
    }),
    updateCourse: builder.mutation({
      query: ({id, ...data})=>{
        return {
          url: `/course/${id}`,
          method: "PATCH",
          body: data
        }
      }
    }),
    deleteCourse: builder.mutation({
      query: (id)=>{
        return {
          url: `/course/${id}`,
          method: "DELETE",          
        }
      }
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
          method: "GET",
          url: `/session?page=${page}&limit=${limit}`,
        };
      },
    }),

    createSession: builder.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: `/session`,
          body: payload,
        };
      },
    }),

    updateSession: builder.mutation({
      query: ({ id, body }) => {
        console.log(body, "body");
        return {
          url: `/session/${id}`,
          method: "PATCH",
          body,
        };
      },
    }),

    deleteSession: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/session/${id}`,
          method: "DELETE",
        };
      },
    }),

    deleteTutorial: builder.mutation({
      query: ({ id }) => {
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
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  
  useGetTopicsQuery,
  useGetSessionsQuery,
  useDeleteTutorialMutation,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = courseApi;
