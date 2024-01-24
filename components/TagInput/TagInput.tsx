"use client";
import { useState, KeyboardEvent } from "react";

const TagsInput = (props: {
  onChange: (tags: string[]) => void;
  name: string;
  placeholder: string;
}) => {
  const [tags, setTags] = useState<string[]>([]);

  const removeTags = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== "") {
      event.currentTarget.value.replace(",", "");

      setTags([...tags, event.currentTarget.value]);
      props.onChange([...tags, event.currentTarget.value]);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-start relative w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
      <ul id="tags" className="flex flex-wrap items-center p-0">
        {tags.map((tag, index) => (
          <li key={index}>
            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-base font-medium dark:border-strokedark dark:bg-white/30">
              {tag}
              <span
                className="cursor-pointer pl-2 hover:text-danger"
                onClick={() => removeTags(index)}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.35355 3.35355C9.54882 3.15829 9.54882 2.84171 9.35355 2.64645C9.15829 2.45118 8.84171 2.45118 8.64645 2.64645L6 5.29289L3.35355 2.64645C3.15829 2.45118 2.84171 2.45118 2.64645 2.64645C2.45118 2.84171 2.45118 3.15829 2.64645 3.35355L5.29289 6L2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L6 6.70711L8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L6.70711 6L9.35355 3.35355Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="w-full flex-1 items-center justify-center bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
        onKeyDown={(event) => (event.key === "," ? addTags(event) : null)}
        onKeyUp={(event) => {
          if (event.key === ",") event.currentTarget.value = "";
        }}
        placeholder={props.placeholder}
        name={props.name}
      />
    </div>
  );
};

export default TagsInput;
