"use client";

import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { TFilm } from "@/types/film.type";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { FilmGenre } from "./constants/film-genres.constant";
import {
  customSelectClassNames,
  customSelectOptions,
} from "./constants/custom-select-configs.constant";
import TagsInput, { TTag } from "@/components/TagInput/TagInput";

type TFilmFilter = Partial<
  Pick<TFilm, "cast" | "director" | "name" | "genres" | "isActive">
>;

const FilmFilter = () => {
  const { handleSubmit, control, register } = useForm<TFilmFilter>();
  const filmFilterOnSubmit = handleSubmit((data) => {});

  return (
    <form
      className="border-separate px-6 xl:px-7.5 mb-10"
      onSubmit={filmFilterOnSubmit}
    >
      <div className="border-stroke dark:border-stroke-dark w-5/6">
        <div className="flex mb-10 gap-20">
          <div className="basis-1/3" role="row">
            <label htmlFor="name">Name</label>
            <div className="mt-2.5 w-full">
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                type="text"
                defaultValue=""
                {...register("name")}
              />
            </div>
          </div>
          <div className="basis-1/3" role="row">
            <label htmlFor="director">Director</label>
            <div className="mt-2.5 w-full">
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                type="text"
                defaultValue=""
                {...register("director")}
              />
            </div>
          </div>
          <div className="basis-1/3" role="row">
            <label htmlFor="cast">Cast</label>
            <div className="mt-2.5 w-full">
              <Controller
                {...register("cast")}
                control={control}
                render={({ field }) => {
                  const handleCastChange = (tags: TTag[]) => {
                    const tagValues = tags.map((tag) => tag.value);
                    field.onChange(tagValues.join(","));
                  };

                  return (
                    <TagsInput
                      onChange={handleCastChange}
                      name={field.name}
                      placeholder=""
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="basis-1/2" role="row">
            <label htmlFor="genres"> Genres</label>
            <div className="mt-2.5 w-full">
              <Controller
                {...register("genres")}
                control={control}
                render={({ field }) => {
                  const handleSelectChange = (
                    values: MultiValue<TCustomSelectOptions<FilmGenre>>,
                  ) => {
                    const genres = values.map((val) => val.value);
                    field.onChange(genres.join(","));
                  };

                  return (
                    <Select
                      name={field.name}
                      isMulti
                      options={customSelectOptions}
                      closeMenuOnSelect={false}
                      onChange={handleSelectChange}
                      classNames={customSelectClassNames}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="basis-1/2" role="row">
            <label htmlFor="status"> Status</label>
            <div className="mt-2.5 w-full">
              <Controller
                {...register("isActive")}
                control={control}
                render={({ field }) => {
                  const activeOptions = [
                    {
                      label: "active",
                      value: true,
                    },
                    {
                      label: "inactive",
                      value: false,
                    },
                  ];
                  return (
                    <Select
                      name={field.name}
                      options={activeOptions}
                      classNames={customSelectClassNames}
                      isClearable={true}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse mt-5">
        <button
          type="submit"
          className="rounded bg-primary py-3 px-10 font-medium text-gray"
        >
          Filter
        </button>
      </div>
    </form>
  );
};

export default FilmFilter;
