import { baseApi } from "../api/baseApi";

const couponsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => {
        return {
          url: "/coupon",
          method: "GET",
        };
      },
    }),

    addCoupon: builder.mutation({
      query: ({ payload }) => {
        console.log(payload);
        return {
          url: "/coupon",
          method: "POST",
          body: payload,
        };
      },
    }),

    updateCoupon: builder.mutation({
      query: ({ data }) => {
        return {
          url: `/coupon/${data?.id}`,
          method: "PATCH",
          body: data?.body,
        };
      },
    }),

    deleteCoupon: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/coupon/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponsApi;
