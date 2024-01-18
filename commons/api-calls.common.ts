import { Api } from "@/constants/api.constant";
import axiosRef from "@/constants/axios-ref.constant";
import { TFilmList } from "@/types/film.type";
import { TResponse } from "@/types/response.type";
import { AxiosResponse } from "axios";

export const getFilms = async (
  pagination: { page: number; limit: number },
  accessToken: string,
) => {
  try {
    const result: AxiosResponse<
      TResponse<{
        films: TFilmList;
        page: number;
        filmsCount: number;
      }>
    > = await axiosRef.get(Api.FILM, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: pagination,
    });

    if (result.data?.type === "success") {
      return result.data;
    }
  } catch (error) {}
};
