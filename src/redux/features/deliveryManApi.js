import { baseApi } from "../api/baseApi";

export const deliveryManApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeliveryMan: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/user/shopper?page=${page}`,
        };
      },
    }),

    updateDeliveryMan: builder.mutation({
      query: ({ id, payload }) => {
        return {
          method: "PATCH",
          url: `/user/change-status/${id}`,
          body: payload,
        };
      },
    }),
  }),
});

export const { useGetDeliveryManQuery, useUpdateDeliveryManMutation } =
  deliveryManApi;
