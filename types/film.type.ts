import { TBaseSchema } from "./base-schema.type";
import { TPoster } from "./poster.type";

export type TFilm = TBaseSchema & {
  name: string;
  description: string;
  poster?: TPoster;
  trailer: string;
  genres: string[];
  director: string;
  cast?: string[];
  releasedAt: string;
  durationInMinutes: number;
  isActive: boolean;
};

export type TFilmList = Pick<
  TFilm,
  | "_id"
  | "name"
  | "poster"
  | "genres"
  | "releasedAt"
  | "durationInMinutes"
  | "isActive"
>[];

export type TFilmFormInput = {
  name: string;
  description: string;
  poster?: File;
  trailer?: string;
  genres: string;
  director: string;
  cast?: string;
  releasedAt: string;
  durationInMinutes: string;
};
