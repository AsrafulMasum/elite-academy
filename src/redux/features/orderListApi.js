import { baseApi } from "../api/baseApi";

const orderListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderList: builder.query({
      query: ({ status, page }) => {
        return {
          url: `/order/admin-orders?page=${page}&status=${status}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetOrderListQuery } = orderListApi;
