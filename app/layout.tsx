"use client";

import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, { FC, useState, useEffect } from "react";
// import { useLoadUserQuery } from "../redux/api/apiSlice";
// import Loader from "./components/Loader/Loader";
import socketID from "socket.io-client";
import Loader from "./components/Loader/Loader";
import { useLoadUserQuery } from "../redux/api/apiSlice";
import Script from "next/script";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketID(ENDPOINT, { transports: ["websocket"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <meta
          name="google-site-verification"
          content="ekIk-SDkc_FtHfflTYbVFM4jTSgBCO1ycVxtTceEcFc"
        />
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-C1FVHMZKWL"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C1FVHMZKWL');
          `}
        </Script>
      </head>
      <body
        className={`w-full min-h-screen overflow-x-hidden font-poppins bg-slate-100 bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300 text-black dark:text-white`}
      >
        {/* <h2>Hello World</h2> */}
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>{children}</Custom>

              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
// useEffect(() => {
//   socketId.on("connection", () => {});
// }, []);

// // for loading feature before the data arrives
const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, refetch } = useLoadUserQuery({});

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  useEffect(() => {
    refetch();
    setIsMounted(true);
  }, [refetch]);

  if (!isMounted) return null;

  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
