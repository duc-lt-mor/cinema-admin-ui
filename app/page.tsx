"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import AuthLayout from "./layouts/auth-layout";

export default function Home() {
  return (
    <AuthLayout>
      <Dashboard />
    </AuthLayout>
  );
}
