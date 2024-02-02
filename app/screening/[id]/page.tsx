import { getScreeningById } from "@/commons/api-calls.common";
import { notFound } from "next/navigation";
import ScreeningForm from "../form";

const ScreeningDetails = async ({ params }: { params: { id: string } }) => {
  const { id: screeningId } = params;
  const result = await getScreeningById(screeningId);
  if (!result) {
    return notFound();
  }

  const {
    data: { screening },
  } = result;

  return <ScreeningForm screening={screening} />;
};

export default ScreeningDetails;
