import { baseApi } from "../api/baseApi";

const offersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOffers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/offer",
        };
      },
    }),

    createOffer: builder.mutation({
      query: (payload) => {
        return {
          method: "POST",
          url: "/offer",
          body: payload,
        };
      },
    }),

    updateOffer: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: `/offer/${data.id}`,
          body: data?.body,
        };
      },
    }),

    deleteOffer: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/offer/${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetOffersQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useDeleteOfferMutation,
} = offersApi;
