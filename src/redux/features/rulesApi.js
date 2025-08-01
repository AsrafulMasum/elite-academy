import { baseApi } from "../api/baseApi";

const rulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRules: builder.query({
      query: ({ type }) => {
        return {
          method: "GET",
          url: `/disclaimer?type=${type}`,
        };
      },
    }),

    updateRules: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/disclaimer",
          body: data,
        };
      },
    }),
  }),
});

export const { useGetRulesQuery, useUpdateRulesMutation } = rulesApi;
