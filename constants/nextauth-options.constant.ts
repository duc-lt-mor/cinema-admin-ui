import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { TCredentials } from "../types/credentials.type";
import { AxiosResponse } from "axios";
import { TResponse } from "../types/response.type";
import { TUser } from "../types/user.type";
import axiosRef from "./axios-ref.constant";
import { Api } from "../constants/api.constant";
import { TSessionWithJwt } from "../types/session-with-jwt.type";
import { TCustomNextAuthJwt } from "../types/custom-nextauth-jwt.type";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials?: TCredentials) {
        try {
          const user: AxiosResponse<TResponse<TUser>> = await axiosRef.post(
            Api.SIGN_IN,
            credentials,
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (user?.data.type === "success") {
            return user.data.data;
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt(params) {
      const { token, user } = params;
      if (user) {
        const { accessToken, refreshToken } = user as TUser;
        token.accessToken = accessToken;
        token.refreshToken = refreshToken;
      }

      return token as TCustomNextAuthJwt;
    },
    session(params) {
      const session = params.session as TSessionWithJwt;
      const token = params.token as TCustomNextAuthJwt;
      session.tokens = {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };

      return session;
    },
  },
};
