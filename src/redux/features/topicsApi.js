import { baseApi } from "../api/baseApi";

const topicsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query({
      query: () => {
        return {
          url: "/topic",
          method: "GET",
        };
      },
    }),

    addTopic: builder.mutation({
      query: (payload) => {
        return {
          url: "/topic",
          method: "POST",
          body: payload,
        };
      },
    }),

    updateTopic: builder.mutation({
      query: (data) => {
        return {
          url: `/topic/${data?.id}`,
          method: "PATCH",
          body: data?.body,
        };
      },
    }),

    deleteTopic: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/topic/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicsApi;
