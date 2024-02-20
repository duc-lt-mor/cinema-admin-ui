"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import { TFilm, TFilmFormInput } from "@/types/film.type";
import { Controller, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { FilmGenre } from "./constants/film-genres.constant";
import { useMutation } from "@tanstack/react-query";
import { createFilm, updateFilm } from "@/commons/api-calls.common";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TagsInput, { TTag } from "@/components/TagInput/TagInput";
import { TResponseError } from "@/types/response.type";
import {
  customSelectClassNames,
  customSelectComponents,
  customSelectOptions,
} from "./constants/custom-select-configs.constant";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import axios from "axios";
import { extractImageName } from "@/commons/extract-image-name.common";
import imageNotFound from "../../public/images/image-not-found.jpeg";
import {
  IMAGE_HEIGHT_IN_ROW,
  IMAGE_WIDTH_IN_ROW,
} from "@/constants/image-dimensions-in-rows";
import Image, { StaticImageData } from "next/image";
import FormButtons from "@/components/FormButtons/FormButtons";

const FilmForm = (props: { film?: TFilm }) => {
  const [defaultValues, setDefaultValues] = useState<TFilmFormInput>();
  const film = useMemo(() => props.film, [props]);
  const [tags, setTags] = useState<TTag[]>([]);

  useEffect(() => {
    const transformDefaultValues = async () => {
      if (film) {
        const newDefaultValues = {
          ...film,
          genres: film.genres.join(","),
          durationInMinutes: film.durationInMinutes.toString(),
        } as TFilmFormInput;

        if (film.poster) {
          const response = await axios.get(film.poster.url, {
            responseType: "blob",
          });

          if (response) {
            const fileName = extractImageName(film.poster.url);
            newDefaultValues.poster = new File([response.data], fileName);
          }
        }

        if (film.cast && film.cast.length > 0) {
          newDefaultValues.cast = film.cast.join(",");
          setTags(
            film.cast.map((actor, i) => ({
              value: actor,
              key: i,
            })),
          );
        }

        if (film.trailer) {
          newDefaultValues.trailer = film.trailer;
        }

        setDefaultValues(newDefaultValues);
      }
    };

    transformDefaultValues();
  }, [props, film]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm<TFilmFormInput>({
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (body: FormData) => {
      if (film) {
        return updateFilm(film._id, body);
      }

      return createFilm(body);
    },
  });

  const filmFormOnSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        formData.set(key, value as any);
      }
    }

    mutation.mutate(formData, {
      onSuccess(data) {
        toast.success(data?.data.message);
        router.push("/film");
      },
      onError(error) {
        // error message format caught in `createFilm`: `Error: ${error.response.data}`
        const serverResponse = JSON.parse(
          error.message.replace("Error: ", ""),
        ) as TResponseError;
        let errorMessage = "An unknown error has occurred";

        // assigning `serverResponse.detail.message` logic to a variable
        // leads to the error: property `message` does not exist on type `string`
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

  const validatePoster = useCallback((value?: TFilmFormInput["poster"]) => {
    if (value) {
      const acceptedFormats = ["png", "jpg", "jpeg", "svg", "webp"];
      const fileExtension = value.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
        return false;
      }
    }

    return true;
  }, []);

  const validateReleaseYear = useCallback(
    (value: TFilmFormInput["releasedAt"]) => {
      if (Number.isNaN(value)) {
        return false;
      }

      const releaseYear = +value;
      return (
        Number.isInteger(releaseYear) &&
        releaseYear >= 1900 &&
        releaseYear <= 2100
      );
    },
    [],
  );

  const validateDuration = useCallback(
    (value: TFilmFormInput["durationInMinutes"]) => {
      if (Number.isNaN(value)) {
        return false;
      }

      const duration = +value;
      return duration > 0;
    },
    [],
  );

  return (
    <AuthLayout>
      <form onSubmit={filmFormOnSubmit}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="name"
            >
              Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Film name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.name?.type === "required" && (
              <p className="text-danger">Name is required</p>
            )}
          </div>

          <div className="mb-6">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="description"
            >
              Description <span className="text-meta-1">*</span>
            </label>
            <textarea
              rows={6}
              {...register("description", { required: true })}
              placeholder="Film description"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
            {errors?.description?.type === "required" && (
              <p className="text-danger">Description is required</p>
            )}
          </div>

          <div className="mb-4.5">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="poster"
            >
              Poster
            </label>

            <Controller
              name="poster"
              control={control}
              rules={{
                required: false,
                validate: validatePoster,
              }}
              render={({ field }) => {
                let imageSrc: string | StaticImageData = field.value
                  ? URL.createObjectURL(field.value)
                  : "";

                const handlePosterChange = (
                  e: ChangeEvent<HTMLInputElement>,
                ) => {
                  const file = e.currentTarget.files?.item(0);
                  if (file) {
                    imageSrc = URL.createObjectURL(file);
                  } else {
                    imageSrc = imageNotFound;
                  }

                  field.onChange(file);
                };

                return (
                  <div className="flex flex-col gap-4">
                    <input
                      name={field.name}
                      type="file"
                      className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      onChange={handlePosterChange}
                    />
                    {field.value && (
                      <Image
                        src={imageSrc}
                        width={IMAGE_WIDTH_IN_ROW * 10}
                        height={IMAGE_HEIGHT_IN_ROW * 10}
                        alt="Image preview"
                      />
                    )}
                  </div>
                );
              }}
            />

            {errors?.poster?.type === "validate" && (
              <p className="text-danger">Only 1 image file is allowed</p>
            )}
          </div>

          <div className="mb-4.5">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="trailer"
            >
              Trailer link
            </label>
            <Controller
              name="trailer"
              control={control}
              rules={{
                required: false,
                pattern:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+~#?&/=]*)/,
              }}
              render={({ field }) => (
                <input
                  name={field.name}
                  type="text"
                  placeholder="Format: http(s)://{domain}"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  value={field.value === "" ? undefined : field.value}
                />
              )}
            />
            {errors?.trailer?.type === "pattern" && (
              <p className="text-danger">Must be a full URL</p>
            )}
          </div>

          <div className="mb-4.5">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="genres"
            >
              Genres <span className="text-meta-1">*</span>
            </label>

            <Controller
              name="genres"
              control={control}
              rules={{ required: true }}
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
                    placeholder="Select film genres..."
                    components={customSelectComponents}
                    closeMenuOnSelect={false}
                    classNames={customSelectClassNames}
                    onChange={handleSelectChange}
                  />
                );
              }}
            />
            {errors?.genres?.type === "required" && (
              <p className="text-danger">Genres are required</p>
            )}
          </div>

          <div className="mb-4.5">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="director"
            >
              Director <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("director", { required: true })}
              placeholder="Director name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.director?.type === "required" && (
              <p className="text-danger">Director name is required</p>
            )}
          </div>

          <div className="mb-4.5 tests">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="cast"
            >
              Cast
            </label>
            <Controller
              name="cast"
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
                    placeholder="Actor names, serapated by comma (,)"
                    tags={tags}
                    setTags={setTags}
                  />
                );
              }}
            />
          </div>

          <div className="mb-4.5">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="releasedAt"
            >
              Release year <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("releasedAt", {
                validate: validateReleaseYear,
                required: true,
              })}
              placeholder="Release year"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.releasedAt?.type === "pattern" && (
              <p className="text-danger">
                Must be a valid year between 1900 and 2100
              </p>
            )}
            {errors?.releasedAt?.type === "required" && (
              <p className="text-danger">Release year is required</p>
            )}
          </div>

          <div className="mb-4.5">
            <label
              className="mb-2.5 block text-black dark:text-white"
              htmlFor="durationInMinutes"
            >
              Duration (minutes) <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("durationInMinutes", {
                validate: validateDuration,
                required: true,
              })}
              placeholder="Duration in minutes"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.durationInMinutes?.type === "validate" && (
              <p className="text-danger">Must be a positive number</p>
            )}
            {errors?.durationInMinutes?.type === "required" && (
              <p className="text-danger">Film duration is required</p>
            )}
          </div>

          <FormButtons />
        </div>
      </form>
    </AuthLayout>
  );
};

export default FilmForm;
