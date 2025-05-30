import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegisration } from "./authSlice";

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

          dispatch(userRegisration({ token: result.data.activationToken }));
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

    // login user
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),

      // to save this data to redux
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          // console.log("ERROR LOGGING IN", error);
        }
      },
    }),

    // social authentication login
    socialAuth: builder.mutation({
      query: ({ name, email, avatar }) => ({
        url: "/social-auth",
        method: "POST",
        body: { name, email, avatar },
        credentials: "include" as const,
      }),

      // to save this data to redux
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              token: result.data.accessToken,
              user: result.data.user,
            })
          );
          // console.log("LOGGED IN WITH SOCIAL AUTH SUCCESSFUL");
        } catch (error: any) {
          // console.log("ERROR LOGGING IN WITH SOCIAL AUTH", error);
        }
      },
    }),

    // logout
    logout: builder.query({
      query: () => ({
        url: "/logout",
        method: "GET",
        credentials: "include" as const,
      }),

      // to save this data to redux
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              token: "",
              user: "",
            })
          );
          // console.log("LOGOUT SUCCESSFULLY");
        } catch (error: any) {
          // console.log("ERROR LOGGING OUT", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutQuery,
} = authApi;
