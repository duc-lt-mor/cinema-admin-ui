import { refreshTokens } from "@/commons/api-calls.common";
import { authConfig } from "@/constants/nextauth-options.constant";
import { TResponseError } from "@/types/response.type";
import { TSessionWithUserDetails } from "@/types/session-with-user-details.type";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";

const getInstance = ({
  accessToken,
  refreshToken,
}: {
  accessToken?: string;
  refreshToken?: string;
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
    async (error: AxiosError<TResponseError>) => {
      const session = (await getServerSession(
        authConfig,
      )) as TSessionWithUserDetails;
      const status = error?.response?.status;
      const config = error?.response?.config;
      if (
        status &&
        config &&
        refreshToken &&
        status === HttpStatusCode.Unauthorized
      ) {
        const result = await refreshTokens(refreshToken);
        if (!result?.data) {
          return Promise.reject(error);
        }

        Object.assign(session.userDetails, {
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        });
        config.headers.Authorization = `Bearer ${result.data.accessToken}`;
        return axiosRef(config);
      }

      throw error;
    },
  );

  return axiosRef;
};

const useAxiosRef = async () => {
  const session = (await getServerSession(
    authConfig,
  )) as TSessionWithUserDetails;
  if (!session) {
    return getInstance({ accessToken: undefined, refreshToken: undefined });
  }

  return getInstance({
    accessToken: session.userDetails.accessToken,
    refreshToken: session.userDetails.refreshToken,
  });
};

export default useAxiosRef;
