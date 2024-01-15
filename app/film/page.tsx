"use client";
import AuthLayout from "../layouts/auth-layout";

const Film = () => {
  return (
    <AuthLayout>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">Films</div>
      </div>
    </AuthLayout>
  );
};

export default Film;
