"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import DropdownIndicator from "@/components/CustomSelect/DropdownIndicator";
import MultiValueRemove from "@/components/CustomSelect/MultiValueRemove";
import { TFilmFormInput } from "@/types/film.type";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { FilmGenre } from "../constants/film-genres.constant";
import TagsInput from "@/components/TagInput/TagInput";

const FilmForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TFilmFormInput>();

  const onSubmit = handleSubmit((data) => {
    const { poster } = data;

    const isValidPoster = poster && "length" in poster && poster.length === 1;
    if (isValidPoster) {
      data.poster = poster[0];
    }
    // TODO: connect to create API
  });

  const validatePoster = (value?: TFilmFormInput["poster"]) => {
    if (value && "length" in value) {
      if (value.length > 1) {
        return false;
      }

      if (value.length === 0) {
        return true;
      }

      const acceptedFormats = ["png", "jpg", "jpeg", "svg", "webp"];
      const fileExtension = value[0].name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
        return false;
      }
    }
    return true;
  };

  const validateReleaseYear = (value: TFilmFormInput["releasedAt"]) => {
    if (Number.isNaN(value)) {
      return false;
    }

    const releaseYear = +value;
    return (
      Number.isInteger(releaseYear) &&
      releaseYear >= 1900 &&
      releaseYear <= 2100
    );
  };

  const validateDuration = (value: TFilmFormInput["durationInMinutes"]) => {
    if (Number.isNaN(value)) {
      return false;
    }

    const duration = +value;
    return duration > 0;
  };

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
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
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              {...register("poster", { validate: validatePoster })}
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
            <input
              type="text"
              {...register("trailer", {
                pattern:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+~#?&/=]*)/,
              })}
              placeholder="Format: http(s)://{domain}"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
              render={({ field }) => (
                <Select
                  isMulti
                  name={field.name}
                  options={Object.values(FilmGenre).map((genre) => {
                    return {
                      value: genre,
                      label: genre,
                    };
                  })}
                  placeholder="Select film genres..."
                  components={{
                    MultiValueRemove,
                    DropdownIndicator,
                  }}
                  classNames={{
                    control: () =>
                      "relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white",
                    multiValue: () =>
                      "m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-base font-medium dark:border-strokedark dark:bg-white/30",
                    multiValueLabel: () => "text-body dark:text-white",
                    input: () => "text-body dark:text-bodydark",
                    placeholder: () => "ml-1 text-body dark:text-bodydark",
                    menu: () =>
                      "dark:border-form-strokedark dark:bg-form-input dark:text-white focus:bg-bodydark",
                  }}
                  closeMenuOnSelect={false}
                  onChange={(values) => field.onChange(values)}
                />
              )}
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
              render={({ field }) => (
                <TagsInput
                  onChange={(tags) => {
                    const tagValues = tags.map((tag) => tag.value);
                    field.onChange(tagValues.join(","));
                  }}
                  name={field.name}
                  placeholder="Actor names, serapated by comma (,)"
                />
              )}
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

export default FilmForm;
