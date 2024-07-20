import React, { useState } from "react";
import { images } from "../../../assets";
import DashboardCard from "./dashboard-card";
import { formatNumber } from "../../../utils/helpers";
import BasicLineChart from "./chart";
import Calendar from "react-calendar";

type Props = {};

const DashboardNextPaymentCard = (props: Props) => {
  return (
    <div className="shrink-0 mt-6 rounded-3xl h[169px] bg-brown">
      <div className="flex flex-col px-6 pt-2.5 pb-6 rounded-3xl max-w-[387px] text-white">
        <div className="flex gap-5 justify-between items-start">
          <div className="flex flex-col mt-2">
            <div className="text-base">Next Repayment</div>
            <div className="mt-3.5 text-2xl font-semibold">₦1,200.00</div>
          </div>
          <img
            src={images.nairaIcon}
            className="shrink-0 aspect-square w-[41px]"
          />
        </div>
        <img
          src={images.marketTrend}
          className="self-center mt-1 w-full aspect-[4.55] "
        />
        <div className="text-right">30th May, 2024</div>
      </div>
    </div>
  );
};

export default DashboardNextPaymentCard;
