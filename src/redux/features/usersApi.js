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

    lockUser: builder.mutation({
      query: ({id}) => {
        console.log(id);
        return {
          url: `/user/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});
export const { useGetStudentsQuery, useGetUsersQuery, useLockUserMutation } =
  usersApi;
