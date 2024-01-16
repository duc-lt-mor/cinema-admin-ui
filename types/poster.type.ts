import { TBaseSchema } from "./base-schema.type";

export type TPoster = TBaseSchema & {
  url: string;
  mediaType: "image";
};
