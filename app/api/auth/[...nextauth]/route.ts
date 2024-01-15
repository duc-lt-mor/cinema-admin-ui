import { authConfig } from "@/constants/nextauth-options.constant";
import NextAuth from "next-auth/next";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
