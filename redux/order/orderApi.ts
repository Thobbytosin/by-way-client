import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all orders
    getAllOrders: builder.query({
      query: () => ({
        url: "/get-all-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = orderApi;
