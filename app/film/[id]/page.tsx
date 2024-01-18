"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import DropdownIndicator from "@/components/CustomSelect/DropdownIndicator";
import MultiValueRemove from "@/components/CustomSelect/MultiValueRemove";
import { useForm } from "react-hook-form";
import Select from "react-select";

enum FilmGenre {
  ACTION = "action",
  DRAMA = "drama",
  COMEDY = "comedy",
  HORROR = "horror",
  PSYCHOLOGICAL = "psychological",
  THRILLER = "thriller",
  FICTION = "fiction",
  ROMANCE = "romance",
}

type TFilmFormInput = {
  name: string;
  description: string;
  poster?: FileList;
  trailer?: string;
  genres: FilmGenre;
  director: string;
  cast?: string[];
  releasedAt: string;
  durationInMinutes: string;
};

const FilmForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFilmFormInput>();
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
            {errors?.name?.type === "required" && <p>Name is required</p>}
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
              {...register("description")}
              placeholder="Film description"
              required
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
            {errors?.description?.type === "required" && (
              <p>Description is required</p>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-black dark:text-white">
              Poster
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              {...register("poster", {
                validate: (value?: FileList) => {
                  if (value && value.length > 0) {
                    const acceptedFormats = [
                      "png",
                      "jpg",
                      "jpeg",
                      "svg",
                      "webp",
                    ];
                    const fileExtension = value[0].name
                      .split(".")
                      .pop()
                      ?.toLowerCase();
                    if (
                      fileExtension &&
                      !acceptedFormats.includes(fileExtension)
                    ) {
                      return false;
                    }
                  }
                  return true;
                },
              })}
            />
            {errors?.poster?.type === "validate" && (
              <p>Only image files are allowed</p>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Trailer link
            </label>
            <input
              type="text"
              {...register("trailer", {
                pattern:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
              })}
              placeholder="Format: http(s)://{domain}"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.trailer?.type === "pattern" && <p>Must be a full URL</p>}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-black dark:text-white">
              Genres <span className="text-meta-1">*</span>
            </label>

            <Select
              isMulti
              required
              name={register("genres").name}
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
                multiValueLabel: () => " text-body dark:text-white",
                input: () => "text-body dark:text-bodydark",
                placeholder: () => "ml-1 text-body dark:text-bodydark",
                menu: () =>
                  "dark:border-form-strokedark dark:bg-form-input dark:text-white focus:bg-bodydark",
              }}
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Director <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("director", { required: true })}
              placeholder="Director name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.director?.type === "required" && (
              <p>Director name is required</p>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Cast
            </label>
            <input
              type="text"
              {...register("cast")}
              placeholder="Actor names, serapated by comma (,)"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Release year <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("releasedAt", {
                pattern: /190[0-9]|19[1-9][0-9]|20[0-9]{2}|2100/,
              })}
              placeholder="Release year"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.releasedAt?.type === "pattern" && (
              <p>Must be a valid year between 1900 and 2100</p>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Duration (minutes) <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              {...register("durationInMinutes", { pattern: /^\d*\.?\d+$/ })}
              required
              placeholder="Duration in minutes"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.durationInMinutes?.type === "pattern" && (
              <p>Must be a positive number</p>
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
