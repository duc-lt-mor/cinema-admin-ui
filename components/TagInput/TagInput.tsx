"use client";
import { useState, KeyboardEvent } from "react";
import CloseIcon from "../common/svg/CloseIcon";

type TTag = {
  key: number;
  value: string;
};

const TagsInput = (props: {
  onChange: (tags: TTag[]) => void;
  name: string;
  placeholder: string;
}) => {
  const [tags, setTags] = useState<TTag[]>([]);

  const removeTags = (indexToRemove: number) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== "") {
      event.currentTarget.value.replace(",", "");
      const lastTagElement = tags.at(tags.length - 1);
      const currentMaxKey = lastTagElement?.key ?? -1;
      const newTag = {
        key: currentMaxKey + 1,
        value: event.currentTarget.value,
      };

      setTags([...tags, newTag]);
      props.onChange([...tags, newTag]);
      event.currentTarget.value = "";
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ",") {
      addTags(event);
    }
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ",") {
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-start relative w-full rounded border border-stroke p-1.5 pr-8 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
      <ul id="tags" className="flex flex-wrap items-center p-0">
        {tags.map((tag, index) => (
          <li key={tag.key}>
            <span className="m-1.5 flex items-center justify-center rounded border-[.5px] border-stroke bg-gray py-1.5 px-2.5 text-base font-medium dark:border-strokedark dark:bg-white/30">
              {tag.value}
              <button
                className="cursor-pointer pl-2 hover:text-danger"
                onClick={() => removeTags(index)}
              >
                <CloseIcon />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="w-full flex-1 items-center justify-center bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder={props.placeholder}
        name={props.name}
      />
    </div>
  );
};

export default TagsInput;
