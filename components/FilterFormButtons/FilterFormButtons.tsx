"use client";

type TFilterFormButtonsProps = {
  handleClearFilter: () => void;
};

const FilterFormButtons = (props: TFilterFormButtonsProps) => {
  return (
    <div className="flex flex-row-reverse gap-5 mt-5">
      <button
        type="submit"
        className="flex w-50 justify-center rounded bg-primary p-3 font-medium text-gray"
      >
        Filter
      </button>
      <button
        type="button"
        onClick={props.handleClearFilter}
        className="flex w-50 justify-center rounded bg-whiten p-3 font-medium text-danger"
      >
        Clear filter
      </button>
    </div>
  );
};

export default FilterFormButtons;
