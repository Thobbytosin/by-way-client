"use client";
import React, { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../utils/theme-provider";
import ReduxProvider from "./ReduxProvider";
import AuthIntializer from "./AuthInitializer";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthIntializer />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </QueryProvider>
      </ReduxProvider>
    </SessionProvider>
  );
};

export default AppProvider;
