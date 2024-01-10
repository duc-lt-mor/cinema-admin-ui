import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Film",
};

const Chart = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12">Films</div>
    </div>
  );
};

export default Chart;
