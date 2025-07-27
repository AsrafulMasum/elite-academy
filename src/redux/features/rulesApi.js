import { baseApi } from "../api/baseApi";

const rulesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/about",
        };
      },
    }),

    updateAboutUs: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/about",
          body: data,
        };
      },
    }),

    getCookiesPolicy: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/cookie",
        };
      },
    }),

    updateCookiesPolicy: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/cookie",
          body: data,
        };
      },
    }),

    getPrivacyPolicy: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/privacy-policy",
        };
      },
    }),

    updatePrivacyPolicy: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/privacy-policy",
          body: data,
        };
      },
    }),

    getTermsCondition: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/terms-and-conditions",
        };
      },
    }),

    updateTermsCondition: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/terms-and-conditions",
          body: data,
        };
      },
    }),

    getRefundPolicy: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/rule/refund",
        };
      },
    }),

    updateRefundPolicy: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/rule/refund",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetAboutUsQuery,
  useUpdateAboutUsMutation,
  useGetCookiesPolicyQuery,
  useUpdateCookiesPolicyMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsConditionQuery,
  useUpdateTermsConditionMutation,
  useGetRefundPolicyQuery,
  useUpdateRefundPolicyMutation,
} = rulesApi;
