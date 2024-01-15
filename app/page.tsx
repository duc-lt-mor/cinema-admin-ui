"use client";
import ECommerce from "@/components/Dashboard/E-commerce";
import AuthLayout from "./layouts/auth-layout";

export default function Home() {
  return (
    <AuthLayout>
      <ECommerce />
    </AuthLayout>
  );
}
