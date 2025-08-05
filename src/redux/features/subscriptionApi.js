import { baseApi } from "../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/package",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),

    createSubscription: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/package",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    updateSubscription: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/package/${data?.id}`,
          body: data?.body,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),

    deleteSubscription: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/package/${id}`,
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionApi;
