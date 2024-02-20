"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import { TFilm } from "@/types/film.type";
import { Controller, useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { useMutation, useQueries } from "@tanstack/react-query";
import {
  createScreening,
  getAuditoriums,
  getFilms,
  updateScreening,
} from "@/commons/api-calls.common";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { TScreening, TScreeningFormInput } from "@/types/screening.type";
import { filmKeys } from "../film/constants/query-key-factory.constant";
import { auditoriumKeys } from "../auditorium/constants/query-key-factory.constant";
import { TAuditorium } from "@/types/auditorium.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { format, isFuture, isValid } from "date-fns";
import {
  FILMS_LOAD_COUNT,
  FILMS_LOAD_PAGE,
} from "./constants/films-load-in-form-configs.constant";
import { onError } from "@/commons/mutation-on-error.common";
import FormButtons from "@/components/FormButtons/FormButtons";

const ScreeningForm = (props: { screening?: TScreening }) => {
  const [defaultValues, setDefaultValues] = useState<TScreeningFormInput>();
  const screening = useMemo(() => props.screening, [props]);

  useEffect(() => {
    const transformDefaultValues = async () => {
      if (screening) {
        const newDefaultValues = {
          filmId: screening.film._id,
          auditoriumId: screening.auditorium._id,
          startsAt: format(screening.startsAt, "yyyy-MM-dd'T'HH:mm"),
        } as TScreeningFormInput;

        setDefaultValues(newDefaultValues);
      }
    };

    transformDefaultValues();
  }, [props, screening]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TScreeningFormInput>({
    defaultValues,
  });

  const router = useRouter();

  const filmsPage = FILMS_LOAD_PAGE;
  const filmsCount = FILMS_LOAD_COUNT;
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

  const screeningMutation = useMutation({
    mutationFn: (body: FormData) => {
      if (screening) {
        return updateScreening(screening._id, body);
      }

      return createScreening(body);
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const validateScreeningStartTime = useCallback(
    (startsAt: TScreeningFormInput["startsAt"]) => {
      const date = new Date(startsAt);
      return isValid(date) && isFuture(date);
    },
    [],
  );

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

  const screeningFormOnSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.set(key, value);
    }

    screeningMutation.mutate(formData, {
      onSuccess(data) {
        toast.success(data?.data.message);
        router.push("/screening");
      },
      onError,
    });
  });

  return (
    <AuthLayout>
      <form onSubmit={screeningFormOnSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="filmId"
            >
              Film name <span className="text-meta-1">*</span>
            </label>

            <Controller
              name="filmId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const handleSelectChange = (
                  value: SingleValue<TCustomSelectOptions<TFilm["_id"]>>,
                ) => {
                  field.onChange(value?.value);
                };

                return (
                  <Select
                    name={field.name}
                    isSearchable={true}
                    options={filmSelectOptions}
                    placeholder="Select film..."
                    onChange={handleSelectChange}
                    {...(screening && {
                      defaultValue: {
                        value: screening.film._id,
                        label: screening.film.name,
                      },
                    })}
                  />
                );
              }}
            />
            {errors?.filmId?.type === "required" && (
              <p className="text-danger">Film name is required</p>
            )}
          </div>
          <div className="mb-4.5">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="auditoriumId"
            >
              Auditorium name <span className="text-meta-1">*</span>
            </label>

            <Controller
              name="auditoriumId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                const handleSelectChange = (
                  value: SingleValue<TCustomSelectOptions<TAuditorium["_id"]>>,
                ) => {
                  field.onChange(value?.value);
                };

                return (
                  <Select
                    name={field.name}
                    isSearchable={true}
                    options={auditoriumSelectOptions}
                    placeholder="Select auditorium..."
                    onChange={handleSelectChange}
                    {...(screening && {
                      defaultValue: {
                        value: screening.auditorium._id,
                        label: screening.auditorium.name,
                      },
                    })}
                  />
                );
              }}
            />
            {errors?.auditoriumId?.type === "required" && (
              <p className="text-danger">Auditorium name is required</p>
            )}
          </div>
          <div className="mb-4.5">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="startsAt"
            >
              Starts at <span className="text-meta-1">*</span>
            </label>

            <Controller
              name="startsAt"
              control={control}
              rules={{ required: true, validate: validateScreeningStartTime }}
              render={({ field }) => {
                const handleInputChange = (
                  event: ChangeEvent<HTMLInputElement>,
                ) => {
                  const date = new Date(event.currentTarget.value);
                  field.onChange(date.toISOString());
                };

                return (
                  <input
                    type="datetime-local"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={handleInputChange}
                    defaultValue={field.value}
                  />
                );
              }}
            />
            {errors?.startsAt?.type === "required" && (
              <p className="text-danger">Start time is required</p>
            )}
            {errors?.startsAt?.type === "validate" && (
              <p className="text-danger">Start time is invalid</p>
            )}
          </div>

          <FormButtons />
        </div>
      </form>
    </AuthLayout>
  );
};

export default ScreeningForm;
