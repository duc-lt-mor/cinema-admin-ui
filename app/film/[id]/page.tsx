import { getFilmById } from "@/commons/api-calls.common";
import FilmForm from "../form";
import { notFound } from "next/navigation";

const FilmDetails = async ({ params }: { params: { id: string } }) => {
  const { id: filmId } = params;
  const result = await getFilmById(filmId);
  if (!result) {
    return notFound();
  }

  const { data: film } = result;
  return <FilmForm film={film} />;
};

export default FilmDetails;
