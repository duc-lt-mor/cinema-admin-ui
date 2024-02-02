import { TBaseSchema } from "./base-schema.type";

export type TAuditoriumRow = {
  name: string;
  seatsCount: number;
  tier: string;
};

export type TAuditorium = TBaseSchema & {
  name: string;
  rows: TAuditoriumRow[];
};

export type TAuditoriumList = TAuditorium[];
