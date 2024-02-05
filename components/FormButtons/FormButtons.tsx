"use client";

import { useRouter } from "next/navigation";

const FormButtons = () => {
  const router = useRouter();
  const handleCancelForm = () => {
    router.back();
  };

  return (
    <div className="buttons flex flex-row-reverse gap-5">
      <button
        type="button"
        onClick={handleCancelForm}
        className="flex w-70 justify-center rounded bg-whiten p-3 font-medium text-danger"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex w-70 justify-center rounded bg-primary p-3 font-medium text-gray"
      >
        Submit
      </button>
    </div>
  );
};

export default FormButtons;
