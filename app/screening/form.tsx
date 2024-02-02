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
import { useCallback, useEffect, useMemo, useState } from "react";
import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { TScreening, TScreeningFormInput } from "@/types/screening.type";
import { filmKeys } from "../film/constants/query-key-factory.constant";
import { auditoriumKeys } from "../auditorium/constants/query-key-factory.constant";
import { TAuditorium } from "@/types/auditorium.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { TResponseError } from "@/types/response.type";
import { isFuture, isValid } from "date-fns";

const ScreeningForm = (props: { screening?: TScreening }) => {
  const [defaultValues, setDefaultValues] = useState<TScreeningFormInput>();
  const screening = useMemo(() => props.screening, [props]);

  useEffect(() => {
    const transformDefaultValues = async () => {
      if (screening) {
        const newDefaultValues = {
          ...screening,
          filmId: screening.film._id,
          auditoriumId: screening.auditorium._id,
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

  const filmsPage = 1;
  const filmsCount = 30;
  const [{ data: filmResult }, { data: auditoriumResult }] = useQueries({
    queries: [
      {
        queryKey: filmKeys.paginate(filmsPage, filmsCount),
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
      onError(error) {
        const serverResponse = JSON.parse(
          error.message.replace("Error: ", ""),
        ) as TResponseError;
        let errorMessage = "An unknown error has occurred";

        if (
          typeof serverResponse.detail === "object" &&
          "message" in serverResponse.detail
        ) {
          errorMessage = JSON.stringify(serverResponse.detail.message);
        } else if (typeof serverResponse.detail === "string") {
          errorMessage = serverResponse.detail;
        }

        toast.error(errorMessage);
      },
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
                    options={
                      filmResult?.data.films?.map<
                        TCustomSelectOptions<TFilm["_id"]>
                      >((film) => {
                        return {
                          value: film._id,
                          label: film.name,
                        };
                      }) ?? []
                    }
                    placeholder="Select film..."
                    onChange={handleSelectChange}
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
                    options={
                      auditoriumResult?.data?.map<
                        TCustomSelectOptions<TAuditorium["_id"]>
                      >((auditorium) => {
                        return {
                          value: auditorium._id,
                          label: auditorium.name,
                        };
                      }) ?? []
                    }
                    placeholder="Select auditorium..."
                    onChange={handleSelectChange}
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
                return (
                  <input
                    type="datetime-local"
                    className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={field.onChange}
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
          <div className="buttons flex flex-row-reverse gap-5">
            <button className="flex w-70 justify-center rounded bg-whiten p-3 font-medium text-danger">
              Cancel
            </button>
            <button className="flex w-70 justify-center rounded bg-primary p-3 font-medium text-gray">
              Submit
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ScreeningForm;
