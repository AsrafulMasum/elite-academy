import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user/profile",
        };
      },
    }),

    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/verify-email",
          body: data,
        };
      },
    }),

    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forget-password",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({payload, token}) => {
        return {
          method: "POST",
          url: "/auth/reset-password",
          body: payload,
          headers: {
            authorization: `${token}`,
          },
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/change-password",
          body: data,
        };
      },
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/user/profile",
          body: data,
        };
      },
    }),

    resendOTP: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forget-password",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useResendOTPMutation,
} = authApi;
