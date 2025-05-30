"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// call the refresh token function and get user info on every page load
const initializeApp = async () => {
  // Check if we are in a production environment (building the app)
  const isBuilding = process.env.NODE_ENV === "production";

  if (!isBuilding) {
    // Only refresh token and load user info in development or runtime
    try {
      // Call the refresh token function if necessary
      // await store.dispatch(
      //     apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
      // );

      // Get user info
      await store.dispatch(
        apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
      );
    } catch (error) {
      // console.error("Error loading user:", error);
      // Handle error, perhaps set user to default values or notify user
    }
  } else {
    // Provide default data or skip fetching user data during build
    // console.log("Skipping user data fetch during build");
    // You might want to set some default state here if necessary
  }
};

initializeApp();
