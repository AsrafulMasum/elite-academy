import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ srcText, page }) => {
        console.log(srcText, page);
        return {
          url: `/user?role=MEMBER&searchTerm=${srcText}&page=${page}`,
          method: "GET",
        };
      },
    }),

    getUsers: builder.query({
      query: ({ srcText, page }) => {
        console.log(srcText, page);
        return {
          url: `/user?role=GUEST&searchTerm=${srcText}&page=${page}`,
          method: "GET",
        };
      },
    }),
    // In your API slice
    getCoach: builder.query({
      query: ({searchTerm, page}) => {
        return {
          url: `/user?role=COUCH&searchTerm=${searchTerm}&page=${page}`,
          method: "GET",
        };
      },
    }),

    addCoach: builder.mutation({
      query:(data)=>{
      return {
        url: "/user?role=COUCH",
        method: "POST",
        body: data
      }
      }
    }),

    updateCoach: builder.mutation({
      query: (data)=>{
        return {
          url: "/user?role=COUCH",
          method: "PATCH",
          body: data
        }
      }
    }),

    getAdmin: builder.query({
      query: ({searchTerm})=>{
        return {
          url: `/user?role=ADMIN&searchTerm=${searchTerm}`,
          method: "GET",
        }
      }
    }),
    lockUser: builder.mutation({
      query: ({ id }) => {        
        return {
          url: `/user/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const {
  useGetStudentsQuery,
  useGetUsersQuery,
  useUpdateCoachMutation,

  useGetAdminQuery,
  useAddCoachMutation,  
  useLockUserMutation,
  useGetCoachQuery,
} = usersApi;
