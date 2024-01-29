import { TBaseSchema } from "./base-schema.type";
import { TPoster } from "./poster.type";

export type TScreening = TBaseSchema & {
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

export type TPartialScreening = Pick<
  TScreening,
  | "_id"
  | "name"
  | "poster"
  | "genres"
  | "releasedAt"
  | "durationInMinutes"
  | "isActive"
>;

export type TScreeningList = TPartialScreening[];

export type TScreeningFormInput = {
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
