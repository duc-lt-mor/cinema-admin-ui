"use client";

import { TPartialFilm } from "@/types/film.type";
import Image, { StaticImageData } from "next/image";
import imageNotFound from "@/public/images/image-not-found.jpeg";
import {
  IMAGE_HEIGHT_IN_ROW,
  IMAGE_WIDTH_IN_ROW,
} from "@/constants/image-dimensions-in-rows";
import ActiveToggleButton from "@/components/ActiveToggleButton/ActiveToggleButton";
import { useState } from "react";
import OpenDetailsButton from "@/components/common/OpenDetailsButton";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import { useMutation } from "@tanstack/react-query";
import { toggleFilmActiveStatus } from "@/commons/api-calls.common";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TResponseError } from "@/types/response.type";
import { screeningListTableColumns } from "./constants/screening-list-table-columns.constant";

const ScreeningRow = ({ film, key }: { film: TPartialFilm; key: string }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(film.isActive);
  const router = useRouter();
  const currentPath = usePathname();
  const toggleActiveMutation = useMutation({
    mutationFn: (filmId: string) => {
      return toggleFilmActiveStatus(filmId, currentPath);
    },
  });

  const handleConfirm = (filmId: string) => {
    toggleActiveMutation.mutate(filmId, {
      onSuccess(data) {
        toast.success(data?.data.message);
        setToggleChecked(!toggleChecked);
        router.refresh();
      },
      onError(error) {
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
  };

  let posterUrl: string | StaticImageData;
  if (!film.poster || film.poster.url === "") {
    posterUrl = imageNotFound;
  } else {
    posterUrl = film.poster.url;
  }

  const genresOnDisplay = film.genres.join(", ");
  return (
    <li
      className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
      key={key}
    >
      <div
        className={`col-span-${screeningListTableColumns["Film"]} flex items-center`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-12.5 w-15 rounded-md">
            <Image
              src={posterUrl}
              width={IMAGE_WIDTH_IN_ROW}
              height={IMAGE_HEIGHT_IN_ROW}
              alt="Film poster"
            />
          </div>

          <p className="text-sm text-black dark:text-white">{film.name}</p>
        </div>
      </div>
      <div
        className={`col-span-${screeningListTableColumns["Auditorium"]} hidden items-center sm:flex`}
      >
        <p className="text-sm text-black dark:text-white">{genresOnDisplay}</p>
      </div>
      <div
        className={`col-span-${screeningListTableColumns["Starts at"]} flex items-center`}
      >
        <p className="text-sm text-black dark:text-white">{film.releasedAt}</p>
      </div>
      <div
        className={`col-span-${screeningListTableColumns["Action"]} flex items-center`}
      >
        <OpenDetailsButton detailsPageUrl={`/film/${film._id}`} />
      </div>
      <ConfirmDialog
        title="Toggle film active status"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => handleConfirm(film._id)}
      >
        <p>
          Are you sure you want to mark <strong>{film.name}</strong> as{" "}
          <strong>{film.isActive ? "inactive" : "active"}</strong>?
        </p>
      </ConfirmDialog>
    </li>
  );
};

export default ScreeningRow;
