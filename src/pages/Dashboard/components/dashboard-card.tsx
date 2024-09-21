import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ iconSrc, value, label, bgColor, route = "" }) => {
  return (
    <Link to={route} className={`flex flex-col`}>
      <div
        className={`grid grid-cols-2 grow justify-between px-6 py-9 w-full h-[150px] rounded-2xl text-[#141B34] shadow-xl max-md:px-5 bg-white`}
      >
        {/* */}
        <div
          className={`flex h-[62px] w-[62px] items-center justify-center rounded-2xl ${bgColor}`}
        >
          {iconSrc}
        </div>
        <div className="flex flex-col items-end my-auto">
          <div className="text-3xl font-medium">{value}</div>
          <div className=" text-sm text-right">{label}</div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
