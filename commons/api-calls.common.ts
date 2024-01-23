import { Api } from "@/constants/api.constant";
import useAxiosRef from "@/hooks/useAxiosRef";
import { TFilmList } from "@/types/film.type";
import { TResponse } from "@/types/response.type";
import { AxiosResponse } from "axios";

export const getFilms = async (pagination: { page: number; limit: number }) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<
      TResponse<{
        films: TFilmList;
        page: number;
        filmsCount: number;
      }>
    > = await axiosRef.get(Api.FILM, { params: pagination });

    if (result.data?.type === "success") {
      return result.data;
    }
  } catch (error) {}
};

export const refreshTokens = async (refreshToken: string) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<
      TResponse<{
        accessToken: string;
        refreshToken: string;
      }>
    > = await axiosRef.post(Api.REFRESH_TOKEN, null, {
      headers: {
        "x-refresh": refreshToken,
      },
    });

    if (result.data?.type === "success") {
      return result.data;
    }
  } catch (error) {}
};
