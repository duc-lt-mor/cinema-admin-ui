"use client";
import AuthLayout from "@/app/layouts/auth-layout";
import DropdownIndicator from "@/components/CustomSelect/DropdownIndicator";
import MultiValueRemove from "@/components/CustomSelect/MultiValueRemove";
import { TFilmFormInput } from "@/types/film.type";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { FilmGenre } from "../constants/film-genres.constant";
import { useMutation } from "@tanstack/react-query";
import { createFilm } from "@/commons/api-calls.common";
import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TagsInput from "@/components/TagInput/TagInput";

const FilmForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<TFilmFormInput>();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (body: FormData) => {
      return createFilm(body);
    },
    onSuccess(data) {
      toast.success(data?.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      router.push("/film");
    },
    onError() {
      toast.error("An error has occurred", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
    },
  });

  const filmFormOnSubmit = handleSubmit(async (data) => {
    const { poster, trailer } = data;

    if (poster && "length" in poster && poster.length === 1) {
      data.poster = poster[0];
    } else {
      delete data.poster;
    }

    if (trailer === "") {
      delete data.trailer;
    }

    const formData = new FormData();
    for (const [k, v] of Object.entries(data)) {
      formData.set(k, v as any);
    }

    mutation.mutate(formData);
  });

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
            <label className="mb-3 block text-black dark:text-white">
              Poster
            </label>

            <input
              {...register("poster", { required: false })}
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />

            {errors?.poster?.type === "validate" && (
              <p className="text-danger">Only 1 image file is allowed</p>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Trailer link
            </label>
            <input
              type="text"
              {...register("trailer", {
                required: false,
                pattern:
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
              })}
              placeholder="Format: http(s)://{domain}"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors?.trailer?.type === "pattern" && (
              <p className="text-danger">Must be a full URL</p>
            )}
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-black dark:text-white">
              Genres <span className="text-meta-1">*</span>
            </label>

            <Controller
              name="genres"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    name={field.name}
                    isMulti
                    required
                    options={Object.values(FilmGenre).map<
                      TCustomSelectOptions<FilmGenre>
                    >((genre) => {
                      return {
                        value: genre,
                        label: genre,
                      };
                    })}
                    placeholder="Select film genres..."
                    components={{
                      MultiValueRemove: MultiValueRemove<
                        TCustomSelectOptions<FilmGenre>
                      >,
                      DropdownIndicator: DropdownIndicator<
                        TCustomSelectOptions<FilmGenre>
                      >,
                    }}
                    closeMenuOnSelect={false}
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
                    onChange={(values) => {
                      field.onChange(values.map((val) => val.value).join(","));
                    }}
                  />
                );
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
              <p className="text-danger">Director name is required</p>
            )}
          </div>

          <div className="mb-4.5 tests">
            <label className="mb-2.5 block text-black dark:text-white">
              Cast
            </label>
            <Controller
              name="cast"
              control={control}
              render={({ field }) => (
                <TagsInput
                  name={field.name}
                  placeholder="Actor names, serapated by comma (,)"
                  onChange={(tags) => {
                    field.onChange(tags.join(","));
                  }}
                />
              )}
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
              <p className="text-danger">
                Must be a valid year between 1900 and 2100
              </p>
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
              <p className="text-danger">Must be a positive number</p>
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
