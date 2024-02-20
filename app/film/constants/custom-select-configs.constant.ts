import { TCustomSelectOptions } from "@/types/custom-select-options.type";
import { FilmGenre } from "./film-genres.constant";
import MultiValueRemove from "@/components/CustomSelect/MultiValueRemove";
import DropdownIndicator from "@/components/CustomSelect/DropdownIndicator";

export const customSelectOptions = Object.values(FilmGenre).map<
  TCustomSelectOptions<FilmGenre>
>((genre) => {
  return {
    value: genre,
    label: genre,
  };
});

export const customSelectComponents = {
  MultiValueRemove: MultiValueRemove<TCustomSelectOptions<FilmGenre>>,
  DropdownIndicator: DropdownIndicator<TCustomSelectOptions<FilmGenre>>,
};

export const customSelectClassNames = {
  control: () =>
    "relative z-20 w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white",
  multiValue: () =>
    "m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-base font-medium dark:border-strokedark dark:bg-white/30",
  multiValueLabel: () => "text-body dark:text-white",
  input: () => "text-body dark:text-white",
  placeholder: () => "ml-1 text-body dark:text-bodydark",
  menu: () =>
    "dark:border-form-strokedark dark:bg-form-input dark:text-white focus:bg-bodydark",
};
