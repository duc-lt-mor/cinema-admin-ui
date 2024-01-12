"use client";
import { useSession } from "next-auth/react";
import AuthLayout from "../layouts/auth-layout";

const Film = () => {
  const session = useSession();
  console.log("session", session);
  return (
    <AuthLayout>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">Films</div>
      </div>
    </AuthLayout>
  );
};

export default Film;
