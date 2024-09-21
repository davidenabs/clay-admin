import React from "react";
import { images } from "../../../assets";
import DashboardCard from "./dashboard-card";
import { formatNumber } from "../../../utils/helpers";
import BasicLineChart from "./chart";

type Props = {};

const DashboardChart = (props: Props) => {
  return (
    <div className="lg:w-[1160px] sm:w-full px-6 lg:px-12 py-6 bg-white rounded-2xl shadow-lg">
      <div className="flex gap- justify-between w-full max-md:flex-wrap">
        <div className="flex flex-col">
          <div className="text-4xl font-bold tracking-tighter leading-10 text-[color(display-p3_0.2941_0.149_0.051)]">
            <span className="">₦37,580.00</span>
          </div>
          <div className="flex gap-2.5 mt-2.5">
            <div className="grow text-sm font-medium tracking-tight leading-6 text-[color(display-p3_0.6392_0.6824_0.8157)]">
              Total Spent
            </div>
            <img
              src={images.arrowCapUpIcon}
              className="shrink-0 self-start w-2 aspect-[2.63] fill-[color(display-p3_0.9216_0.5765_0.2863)]"
            />
            <div className="text-xs font-bold tracking-tight leading-5 text-center text-[color(display-p3_0.9216_0.5765_0.2863)]">
              +2.45%
            </div>
          </div>
        </div>

        <div className="flex flex-col self-end max-w-full leading-10 text-base whitespace-nowrap w-[261px]">
          <div className="flex gap-5">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="timeline"
                className="rounded-full accent-lightBrown h-[18px] w-[18px] focus:accent-brown"
              />
              <div>Daily</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="timeline"
                className="rounded-full accent-lightBrown h-[18px] w-[18px] focus:accent-brown"
              />
              <div>Week</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="timeline"
                className="rounded-full accent-lightBrown h-[18px] w-[18px] focus:accent-brown"
              />
              <div>Month</div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {/* chart */}

        <BasicLineChart />
      </div>
    </div>
  );
};

export default DashboardChart;
