import { baseApi } from "../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ srcText, page }) => {
        return {
          url: `/user/users?role=CUSTOMER&searchTerm=${srcText}&page=${page}`,
          method: "GET",
        };
      },
    }),
  }),
});
export const { useGetUsersQuery } = usersApi;
