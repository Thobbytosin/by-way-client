import "./globals.css";
import React from "react";
import Script from "next/script";
import AppProvider from "./providers/AppProvider";

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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
