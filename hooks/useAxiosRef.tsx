import { refreshTokens } from "@/commons/api-calls.common";
import { authConfig } from "@/constants/nextauth-options.constant";
import { TSessionWithJwt } from "@/types/session-with-jwt.type";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";

const getInstance = ({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken: string;
}) => {
  const axiosRef = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
  });

  axiosRef.interceptors.request.use(
    (config) => {
      if (accessToken && !config.url?.includes("auth")) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  axiosRef.interceptors.response.use(
    (result) => result,
    async (error: AxiosError) => {
      const session = (await getServerSession(authConfig)) as TSessionWithJwt;
      const { status, config } = error.response!;
      if (status === HttpStatusCode.Unauthorized) {
        const result = await refreshTokens(refreshToken);
        if (!result || !result.data) {
          return Promise.reject(error);
        }

        session.tokens = {
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        };

        config.headers.Authorization = `Bearer ${result.data.accessToken}`;
      }

      return axiosRef(config);
    },
  );

  return axiosRef;
};

const useAxiosRef = async () => {
  const {
    tokens: { accessToken, refreshToken },
  } = (await getServerSession(authConfig)) as TSessionWithJwt;

  return getInstance({ accessToken, refreshToken });
};

export default useAxiosRef;
