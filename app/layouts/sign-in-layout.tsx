import { ReactNode } from "react";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center content-center items-center h-screen">
      {children}
    </div>
  );
}
