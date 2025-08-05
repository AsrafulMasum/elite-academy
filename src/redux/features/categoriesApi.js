import { baseApi } from "../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builders) => ({
    getSubCategories: builders.query({
      query: () => ({
        url: "/sub-category",
        method: "GET",
      }),
    }),

    addSubCategory: builders.mutation({
      query: (data) => {
        return {
          url: "/sub-category",
          method: "POST",
          body: data,
        };
      },
    }),

    deleteSubCategory: builders.mutation({
      query: (id)=>{
        return {
          url: `/sub-category/${id}`,
          method: "DELETE",          
        }
      }
    }),

    getCategories: builders.query({
      query: ({searchTerm, page}) => ({
        url: `/category/?searchTerm=${searchTerm}&page=${page}`,
        method: "GET",
      }),
    }),
    
    addCategory: builders.mutation({
      query: (data) => {
        return {
          url: "/category",
          method: "POST",
          body: data,
        };
      },
    }),

    deleteCategory: builders.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
    }),
    
    updateCategory: builders.mutation({
      query: (data) => {
        return {
          url: `/category/${data?.id}`,
          method: "PATCH",
          body: data?.formData,
        };
      },
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,  
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoriesApi;
