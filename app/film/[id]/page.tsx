"use client";
import AuthLayout from "@/app/layouts/auth-layout";
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

const FilmModal = () => {
  const { handleSubmit } = useForm();
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="p-6.5">
          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Film name"
              required
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white">
              Description <span className="text-meta-1">*</span>
            </label>
            <textarea
              rows={6}
              placeholder="Film description"
              required
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-black dark:text-white">
              Poster
            </label>
            <input
              type="file"
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Trailer link
            </label>
            <input
              type="text"
              placeholder="Trailer link, e.g., a YouTube link"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div className="mb-4.5">
            <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="film-genres"
            >
              Genres <span className="text-meta-1">*</span>
            </label>

            <Select
              isMulti
              required
              name="film-genres"
              options={Object.values(FilmGenre).map((genre) => {
                return {
                  value: genre,
                  label: genre,
                };
              })}
              className="relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              unstyled
              styles={{
                multiValue: (base) => {
                  return {
                    ...base,
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                  };
                },
                multiValueLabel(base) {
                  return {
                    ...base,
                    boxSizing: "border-box",
                    borderStyle: "solid",
                    margin: "0.375rem",
                    borderRadius: "0.25rem",
                    borderWidth: ".5px",
                    paddingLeft: "0.625rem",
                    paddingRight: "0.625rem",
                    paddingTop: "0.375rem",
                    paddingBottom: "0.375rem",
                    fontSize: "1rem",
                    lineHeight: "1.25rem",
                    fontWeight: "500",
                    borderColor: "rgb(46 58 71)",
                    backgroundColor: "rgb(255 255 255 / 0.3)",
                  };
                },
              }}
            />
            {/* </div> */}
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Director
            </label>
            <input
              type="text"
              placeholder="Director name"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
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

export default FilmModal;
