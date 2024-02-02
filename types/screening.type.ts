import { TBaseSchema } from "./base-schema.type";
import { TFilm } from "./film.type";

export type TScreening = TBaseSchema & {
  film: Pick<TFilm, "name" | "poster" | "_id">;
  auditorium: {
    name: string;
    _id: string;
  };
  startsAt: string;
};

export type TScreeningList = TScreening[];

export type TScreeningFormInput = {
  filmId: string;
  auditoriumId: string;
  startsAt: string;
};
