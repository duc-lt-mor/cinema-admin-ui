import { TScreening } from "@/types/screening.type";

export const sampleScreenings: TScreening[] = Array.from(
  { length: 20 },
  (_, k) => k + 1,
).map((key) => {
  return {
    _id: key.toString(),
    film: {
      name: `Film ${key}`,
    },
    auditorium: {
      name: `Auditorium ${key}`,
    },
    startsAt: "10:00 31/01/2024",
  };
});
