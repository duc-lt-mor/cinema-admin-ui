"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import { useSession } from "next-auth/react";
import AuthLayout from "./layouts/auth-layout";

// export const metadata: Metadata = {
//   title: "Admin | Dashboard",
// };

export default function Home() {
  const { data } = useSession();
  console.log(data);
  return (
    <AuthLayout>
      <ECommerce />
    </AuthLayout>
  );
}
