"use server";
import { Api } from "@/constants/api.constant";
import { TFilmList } from "@/types/film.type";
import useAxiosRef from "@/hooks/useAxiosRef";
import {
  TResponse,
  TResponseError,
  TResponseSuccess,
} from "@/types/response.type";
import { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";

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

export const createFilm = async (body: FormData) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponseSuccess<{ message: string }>> =
      await axiosRef.post(Api.FILM, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    if (result.data) {
      revalidatePath("/films");
      return result.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response as AxiosResponse<TResponseError>;
      if (response.data) {
        throw JSON.stringify(response.data);
      }
    }
  }
};
