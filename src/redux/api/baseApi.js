import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://31.97.114.108:5000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        headers.set("Authorization", `Bearer ${JSON.parse(token)}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["notifications"],
});

export const imageUrl = "http://31.97.114.108:5000";
