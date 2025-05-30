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

    // get stripe publishable key
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "/payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("STRIPE PUBLISHABLE KEY");
        } catch (error: any) {
          // console.log("ERROR FETCHING STRIPE PUBLISHABLE KEY", error);
        }
      },
    }),

    // create stripe payment
    createPaymentIntent: builder.mutation({
      query: (amount: number) => ({
        url: "/payment",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("STRIPE PAYMENT INTENT");
        } catch (error: any) {
          // console.log("ERROR CREATING STRIPE PAYMENT INTENT", error);
        }
      },
    }),

    // create order
    createOrder: builder.mutation({
      query: ({ payment_info, courseId }) => ({
        url: "/create-order",
        method: "POST",
        body: { payment_info, courseId },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
} = orderApi;
