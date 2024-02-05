"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { signIn as signInAction } from "@/lib/features/user/user-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TSessionWithUserDetails } from "@/types/session-with-user-details.type";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useMemo, useState } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = useSession();
  const currentUser = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const isAuthenticated = useMemo(
    () =>
      currentUser.email === "" &&
      currentUser.role === "" &&
      session.status === "authenticated",
    [],
  );

  useEffect(() => {
    if (isAuthenticated) {
      const { userDetails } = session.data as TSessionWithUserDetails;
      dispatch(
        signInAction({
          email: userDetails.email,
          role: userDetails.role,
        }),
      );
    }
  });

  return (
    <div className="dark">
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      </div>
    </div>
  );
}
