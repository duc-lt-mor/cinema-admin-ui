"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import StoreProvider from "./store-provider";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient, setQueryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <SessionProvider>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick={true}
                theme="light"
              />
              {children}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </SessionProvider>
          </StoreProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
