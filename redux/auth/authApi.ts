import { apiSlice } from "../api/apiSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

// mutation for post and // query for get
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // user registration
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),

      // to save the data to our authslice token
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // console.log("USER REGISTRATION SUCCESSFUL");
        } catch (error: any) {
          // console.log("ERROR REGISTERING USER", error);
        }
      },
    }),

    // activate-user
    activation: builder.mutation({
      query: ({ activationCode, activationToken }) => ({
        url: "/activate-user",
        method: "POST",
        body: { activationCode, activationToken },
      }),
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;
