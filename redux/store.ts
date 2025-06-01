"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import courseReducer from "./course/course.slice";

export const store = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      course: courseReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of `makeStore`
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
