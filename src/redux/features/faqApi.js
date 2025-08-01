import { baseApi } from "../api/baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFAQ: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/faq",
        };
      },
    }),

    createFAQ: builder.mutation({
      query: (faq) => ({
        method: "POST",
        url: "/faq",
        body: faq,
      }),
    }),

    updateFAQ: builder.mutation({
      query: ({ id, faq }) => ({
        method: "PUT",
        url: `/faq/${id}`,
        body: faq,
      }),
    }),

    deleteFAQ: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/faq/${id}`,
      }),
    }),
  }),
});

export const {
  useGetFAQQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = faqApi;
