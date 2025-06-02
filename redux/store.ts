// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
import courseReducer from "./course/course.slice";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "course"],
};

// Wrap reducers with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCourseReducer = persistReducer(persistConfig, courseReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    course: persistedCourseReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

// Infer types
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
