"use client";

import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { TFilm } from "@/types/film.type";
import {
  FILMS_LOAD_COUNT,
  FILMS_LOAD_PAGE,
} from "./constants/films-load-in-form-configs.constant";
import { useQueries } from "@tanstack/react-query";
import { filmKeys } from "../film/constants/query-key-factory.constant";
import { getAuditoriums, getFilms } from "@/commons/api-calls.common";
import { auditoriumKeys } from "../auditorium/constants/query-key-factory.constant";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { TAuditorium } from "@/types/auditorium.type";
import { compareAsc, isValid } from "date-fns";
import FilterFormButtons from "@/components/FilterFormButtons/FilterFormButtons";
import { Mutable } from "@/types/utils.type";
import { TScreeningFilter } from "@/types/screening.type";
import { useAppDispatch } from "@/lib/hooks";
import { setScreeningFilter } from "@/lib/features/screening/screening-slice";

const ScreeningFilter = () => {
  const filmsPage = FILMS_LOAD_PAGE;
  const filmsCount = FILMS_LOAD_COUNT;

  const [filmIdSelectValues, setFilmIdSelectValues] = useState<
    TCustomSelectOptions<TFilm["_id"]>[]
  >([]);

  const [audIdSelectValues, setAudIdSelectValues] = useState<
    TCustomSelectOptions<TAuditorium["_id"]>[]
  >([]);

  const [startDateInputValue, setStartDateInputValue] = useState("");
  const [endDateInputValue, setEndDateInputValue] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
    getValues,
    reset,
  } = useForm<TScreeningFilter>();

  const dispatch = useAppDispatch();

  const [{ data: filmResult }, { data: auditoriumResult }] = useQueries({
    queries: [
      {
        queryKey: filmKeys.filter({ page: filmsPage, limit: filmsCount }),
        queryFn: () => {
          return getFilms({ page: filmsPage, limit: filmsCount });
        },
      },
      {
        queryKey: auditoriumKeys.all,
        queryFn: () => {
          return getAuditoriums();
        },
      },
    ],
  });

  const filmSelectOptions = useMemo(
    () =>
      filmResult?.data.films?.map<TCustomSelectOptions<TFilm["_id"]>>(
        (film) => {
          return {
            value: film._id,
            label: film.name,
          };
        },
      ) ?? [],
    [filmResult],
  );

  const auditoriumSelectOptions = useMemo(
    () =>
      auditoriumResult?.data?.map<TCustomSelectOptions<TAuditorium["_id"]>>(
        (auditorium) => {
          return {
            value: auditorium._id,
            label: auditorium.name,
          };
        },
      ) ?? [],
    [auditoriumResult],
  );

  const validateScreeningStartDate = useCallback(
    (startDateString: TScreeningFilter["startDate"]) => {
      if (typeof startDateString === "undefined") {
        return true;
      }

      const date = new Date(startDateString);
      return isValid(date);
    },
    [],
  );

  const validateScreeningEndDate = useCallback(
    (endDateString: TScreeningFilter["endDate"]) => {
      if (typeof endDateString === "undefined") {
        return true;
      }

      const { startDate: startDateString } = getValues();
      if (typeof startDateString === "undefined") {
        return true;
      }

      const endDate = new Date(endDateString);
      const startDate = new Date(startDateString);

      return (
        isValid(endDate) &&
        isValid(startDate) &&
        compareAsc(endDate, startDate) >= 0
      );
    },
    [],
  );

  const screeningFilterOnSubmit = handleSubmit((data) => {
    for (const prop in data) {
      const _prop = prop as keyof TScreeningFilter;
      if (!dirtyFields[_prop]?.valueOf()) {
        delete data[_prop];
      }
    }

    console.log(data);

    dispatch(setScreeningFilter(data));
  });

  const handleClearFilter = () => {
    reset();
    setFilmIdSelectValues([]);
    setAudIdSelectValues([]);
    setStartDateInputValue("");
    setEndDateInputValue("");
    dispatch(setScreeningFilter({}));
  };

  return (
    <form
      className="border-separate px-6 xl:px-7.5 mb-10"
      onSubmit={screeningFilterOnSubmit}
    >
      <div className="border-stroke dark:border-stroke-dark w-5/6">
        <div className="flex mb-10 gap-5">
          <div className="basis-1/4" role="row">
            <label htmlFor="filmIds">Films</label>
            <div className="mt-2.5 w-full">
              <Controller
                name="filmIds"
                control={control}
                render={({ field }) => {
                  const handleSelectChange = (
                    values: MultiValue<TCustomSelectOptions<TFilm["_id"]>>,
                  ) => {
                    const _values = values as Mutable<typeof values>;
                    setFilmIdSelectValues(_values);
                    const filmIds = values.map((option) => option.value);
                    field.onChange(filmIds);
                  };

                  return (
                    <Select
                      name={field.name}
                      isMulti
                      isSearchable={true}
                      options={filmSelectOptions}
                      onChange={handleSelectChange}
                      closeMenuOnSelect={false}
                      value={filmIdSelectValues}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="basis-1/4" role="row">
            <label htmlFor="auditoriumIds">Auditoriums</label>
            <div className="mt-2.5 w-full">
              <Controller
                name="auditoriumIds"
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  const handleSelectChange = (
                    values: MultiValue<
                      TCustomSelectOptions<TAuditorium["_id"]>
                    >,
                  ) => {
                    console.log(values);
                    const _values = values as Mutable<typeof values>;
                    setAudIdSelectValues(_values);
                    const auditoriumIds = values.map((option) => option.value);
                    field.onChange(auditoriumIds);
                  };

                  return (
                    <Select
                      name={field.name}
                      isMulti
                      isSearchable={true}
                      options={auditoriumSelectOptions}
                      onChange={handleSelectChange}
                      closeMenuOnSelect={false}
                      value={audIdSelectValues}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="basis-1/4" role="row">
            <label htmlFor="startDate">Start date</label>
            <div className="mt-2.5 w-full">
              <Controller
                name="startDate"
                control={control}
                rules={{ validate: validateScreeningStartDate }}
                render={({ field }) => {
                  const handleStartDateInputChange = (
                    event: ChangeEvent<HTMLInputElement>,
                  ) => {
                    const { value } = event.currentTarget;
                    if (value === "") {
                      field.onChange(undefined);
                    } else {
                      field.onChange(value);
                      setStartDateInputValue(value);
                    }
                  };

                  return (
                    <input
                      type="date"
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={handleStartDateInputChange}
                      value={startDateInputValue}
                    />
                  );
                }}
              />
              {errors?.startDate?.type === "validate" && (
                <p className="text-danger">Start date is invalid</p>
              )}
            </div>
          </div>
          <div className="basis-1/4" role="row">
            <label htmlFor="endDate">End date</label>
            <div className="mt-2.5 w-full">
              <Controller
                name="endDate"
                control={control}
                rules={{ validate: validateScreeningEndDate }}
                render={({ field }) => {
                  const handleEndDateInputChange = (
                    event: ChangeEvent<HTMLInputElement>,
                  ) => {
                    const { value } = event.currentTarget;
                    if (value === "") {
                      field.onChange(undefined);
                    } else {
                      field.onChange(value);
                      setEndDateInputValue(value);
                    }
                  };

                  return (
                    <input
                      type="date"
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={handleEndDateInputChange}
                      value={endDateInputValue}
                    />
                  );
                }}
              />
              {errors?.endDate?.type === "validate" && (
                <p className="text-danger">End date is invalid</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <FilterFormButtons handleClearFilter={handleClearFilter} />
    </form>
  );
};

export default ScreeningFilter;
