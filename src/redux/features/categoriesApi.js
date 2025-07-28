import { baseApi } from "../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builders) => ({
    getSubCategories: builders.query({
      query: () => ({
        url: "/sub-category",
        method: "GET",
      }),
    }),
    getCategories: builders.query({
        url: "/category",
        method: "POST"
    })

  }),  
});

export const {
     useGetSubCategoriesQuery, 
     useGetCategoriesQuery
    } =
  categoriesApi;
