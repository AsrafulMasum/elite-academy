import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ searchTerm, page, limit }) => {
        return {
          method: "GET",
          url: `/product?limit=${limit}&page=${page}&searchTerm=${searchTerm}`,
        };
      },
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
    }),

    updateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/product/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
