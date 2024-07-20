import React, { useState } from "react";
import StaffHistoryCard from "./components/cards/staffHistory";
import DashboardCardCounter from "./components/dashboardCardCounter";
import DashboardChart from "./components/dashboardChart";
import DashboardCalender from "./components/dashboardCalender";
import DashboardNextPaymentCard from "./components/dashboardNextPaymentCard";

const Home = () => {
  return (
    <>
      <div className="px-10 space-y-6">
        <DashboardCardCounter />
        <div className="lg:flex :flex-col gap-5 ">
          {/* <DashboardChart /> */}
          <div className="lg:w-[387px]  sm:w-full">
            <div className="flex flex-col grow max-md:mt-7">
              {/* <DashboardCalender />
              <DashboardNextPaymentCard /> */}
            </div>
          </div>
        </div>
        {/* <StaffHistoryCard /> */}
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    </>
  );
};

export default Home;
