"use client";

import Image from "next/image";
import imageNotFound from "@/public/images/image-not-found.jpeg";
import {
  IMAGE_HEIGHT_IN_ROW,
  IMAGE_WIDTH_IN_ROW,
} from "@/constants/image-dimensions-in-rows";
import { useMemo, useState } from "react";
import OpenDetailsButton from "@/components/common/OpenDetailsButton";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog";
import { screeningListTableColumns } from "./constants/screening-list-table-columns.constant";
import { TScreening } from "@/types/screening.type";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteScreening } from "@/commons/api-calls.common";
import { toast } from "react-toastify";
import { TResponseError } from "@/types/response.type";

const ScreeningRow = ({
  screening,
  key,
}: {
  screening: TScreening;
  key: string;
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const currentPath = usePathname();
  const deleteScreeningMutation = useMutation({
    mutationFn: (screeningId: string) => {
      return deleteScreening(screeningId, currentPath);
    },
  });

  const handleConfirm = (screeningId: string) => {
    deleteScreeningMutation.mutate(screeningId, {
      onSuccess(data) {
        toast.success(data?.data.message);
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

  const posterUrl = useMemo(() => {
    if (!screening.film.poster?.url) {
      return imageNotFound;
    }
    return screening.film.poster.url;
  }, [screening]);

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

          <p className="text-sm text-black dark:text-white">
            {screening.film.name}
          </p>
        </div>
      </div>
      <div
        className={`col-span-${screeningListTableColumns["Auditorium"]} hidden items-center sm:flex`}
      >
        <p className="text-sm text-black dark:text-white">
          {screening.auditorium.name}
        </p>
      </div>
      <div
        className={`col-span-${screeningListTableColumns["Starts at"]} flex items-center`}
      >
        <p className="text-sm text-black dark:text-white">
          {format(screening.startsAt, "yyyy-MM-dd HH:mm")}
        </p>
      </div>
      <div
        className={`col-span-${screeningListTableColumns["Action"]} flex items-center gap-4`}
      >
        <OpenDetailsButton detailsPageUrl={`/screening/${screening._id}`} />
        <DeleteButton onClick={() => setOpenDialog(true)} />
      </div>
      <ConfirmDialog
        title="Toggle film active status"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => handleConfirm(screening._id)}
      >
        <p>
          Are you sure you want to delete this screening? This action cannot be
          undone!
        </p>
      </ConfirmDialog>
    </li>
  );
};

export default ScreeningRow;
