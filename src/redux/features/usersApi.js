import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: ({ searchText, page }) => {
        return {
          url: `/user?role=MEMBER&searchTerm=${searchText}&page=${page}`,
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

    getCoach: builder.query({
      query: (searchTerm = "") => {
        return {
          url: `/user?role=COUCH&searchTerm=${searchTerm}`,
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
  useAddCoachMutation,  
  useLockUserMutation,
  useGetCoachQuery,
} = usersApi;
