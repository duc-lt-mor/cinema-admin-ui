"use server";
import { Api } from "@/constants/api.constant";
import { TFilm, TFilmList } from "@/types/film.type";
import useAxiosRef from "@/hooks/useAxiosRef";
import { TResponse, TResponseError } from "@/types/response.type";
import { AxiosError, AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";
import { EResponseType } from "@/constants/response-type.constant";
import {
  TScreening,
  TScreeningList,
  TScreeningSlot,
} from "@/types/screening.type";
import { TAuditoriumList } from "@/types/auditorium.type";

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

    if (result.data?.type === EResponseType.SUCCESS) {
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

    if (result.data?.type === EResponseType.SUCCESS) {
      return result.data;
    }
  } catch (error) {}
};

export const createFilm = async (body: FormData) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<{ message: string }>> =
      await axiosRef.post(Api.FILM, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    if (result.data.type === EResponseType.SUCCESS) {
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

export const getFilmById = async (filmId: string) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<TFilm>> = await axiosRef.get(
      `${Api.FILM}/${filmId}`,
    );

    if (result.data?.type === EResponseType.SUCCESS) {
      return result.data;
    }
  } catch (error) {}
};

export const updateFilm = async (filmId: string, body: FormData) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<{ message: string }>> =
      await axiosRef.patch(`${Api.FILM}/${filmId}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    if (result.data.type === EResponseType.SUCCESS) {
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

export const toggleFilmActiveStatus = async (
  filmId: string,
  currentClientPath: string,
) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<{ message: string }>> =
      await axiosRef.patch(`${Api.FILM}/${filmId}/status`, null);

    if (result.data.type === EResponseType.SUCCESS) {
      revalidatePath(currentClientPath);
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

export const getScreenings = async (pagination: {
  page: number;
  limit: number;
}) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<
      TResponse<{
        screenings: TScreeningList;
        page: number;
        screeningsCount: number;
      }>
    > = await axiosRef.get(Api.SCREENING, { params: pagination });

    if (result.data?.type === EResponseType.SUCCESS) {
      return result.data;
    }
  } catch (error) {}
};

export const getScreeningById = async (screeningId: string) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<
      TResponse<{
        screening: TScreening;
        slots: TScreeningSlot[];
      }>
    > = await axiosRef.get(`${Api.SCREENING}/${screeningId}`);

    if (result.data?.type === EResponseType.SUCCESS) {
      return result.data;
    }
  } catch (error) {}
};

export const deleteScreening = async (screeningId: string) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<{ message: string }>> =
      await axiosRef.delete(`${Api.SCREENING}/${screeningId}`);

    if (result.data.type === EResponseType.SUCCESS) {
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

export const createScreening = async (body: FormData) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<{ message: string }>> =
      await axiosRef.post(Api.SCREENING, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (result.data.type === EResponseType.SUCCESS) {
      revalidatePath("/screening");
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

export const updateScreening = async (screeningId: string, body: FormData) => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<{ message: string }>> =
      await axiosRef.put(`${Api.SCREENING}/${screeningId}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    if (result.data.type === EResponseType.SUCCESS) {
      revalidatePath("/screening");
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

export const getAuditoriums = async () => {
  try {
    const axiosRef = await useAxiosRef();
    const result: AxiosResponse<TResponse<TAuditoriumList>> =
      await axiosRef.get(Api.AUDITORIUM);

    if (result.data?.type === EResponseType.SUCCESS) {
      return result.data;
    }
  } catch (error) {}
};
