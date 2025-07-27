import { baseApi } from "../api/baseApi";

const shopOwnerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getShopOwner: builder.query({
      query: (page) => {
        return {
          method: "GET",
          url: `/user/shop?page=${page}`,
        };
      },
    }),

    updateShopOwner: builder.mutation({
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

export const { useGetShopOwnerQuery, useUpdateShopOwnerMutation } =
  shopOwnerApi;
