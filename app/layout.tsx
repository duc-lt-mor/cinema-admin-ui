"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <ToastContainer />
            {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
