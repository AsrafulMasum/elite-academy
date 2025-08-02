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
  }),
});
