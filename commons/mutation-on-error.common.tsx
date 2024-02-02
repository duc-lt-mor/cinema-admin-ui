import { TResponseError } from "@/types/response.type";
import { toast } from "react-toastify";

export function onError(error: Error) {
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
}
