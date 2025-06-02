import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    // baseUrl: "http://localhost:8000/",
  }),
  endpoints: (builder) => ({}),
});

export const {} = apiSlice;
