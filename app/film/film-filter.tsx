"use client";

import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { TFilmFilter } from "@/types/film.type";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { FilmGenre } from "./constants/film-genres.constant";
import {
  customSelectClassNames,
  customSelectOptions,
} from "./constants/custom-select-configs.constant";
import TagsInput, { TTag } from "@/components/TagInput/TagInput";
import { useAppDispatch } from "@/lib/hooks";
import { setFilmFilter } from "@/lib/features/film/film-slice";
import FilterFormButtons from "@/components/FilterFormButtons/FilterFormButtons";
import { useState } from "react";
import { Mutable } from "@/types/utils.type";

const FilmFilter = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { dirtyFields },
  } = useForm<TFilmFilter>();
  const dispatch = useAppDispatch();

  const filmFilterOnSubmit = handleSubmit((data) => {
    for (const prop in data) {
      const _prop = prop as keyof TFilmFilter;
      if (!dirtyFields[_prop]?.valueOf()) {
        delete data[_prop];
      }
    }

    dispatch(setFilmFilter(data));
  });

  const [genresSelectValues, setGenresSelectValues] = useState<
    TCustomSelectOptions<FilmGenre>[]
  >([]);

  const [activeSelectValue, setActiveSelectValue] =
    useState<TCustomSelectOptions<boolean> | null>(null);

  const [tags, setTags] = useState<TTag[]>([]);

  const handleClearFilter = () => {
    reset();
    setGenresSelectValues([]);
    setActiveSelectValue(null);
    setTags([]);
    dispatch(setFilmFilter({}));
  };

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
                      tags={tags}
                      setTags={setTags}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-20">
          <div className="basis-1/2" role="row">
            <label htmlFor="genres">Genres</label>
            <div className="mt-2.5 w-full">
              <Controller
                {...register("genres")}
                control={control}
                render={({ field }) => {
                  const handleSelectChange = (
                    values: MultiValue<TCustomSelectOptions<FilmGenre>>,
                  ) => {
                    const _values = values as Mutable<typeof values>;
                    setGenresSelectValues(_values);
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
                      value={genresSelectValues}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="basis-1/2" role="row">
            <label htmlFor="status">Status</label>
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
                      classNames={{
                        ...customSelectClassNames,
                        singleValue: () => "dark:text-white",
                      }}
                      onChange={(value) => {
                        setActiveSelectValue(value);
                      }}
                      value={activeSelectValue}
                      isClearable={true}
                    />
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <FilterFormButtons handleClearFilter={handleClearFilter} />
    </form>
  );
};

export default FilmFilter;
