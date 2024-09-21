import React from "react";

const SwitchButton = ({ selectedFilter, onFilterChange }) => {
  return (
    <div className="flex justify-between items-center pl6 h-7 px8 my-auto text-xs tracking-wide leading- text-[#717579] bg-[#EFF6FF] rounded-2xl max-w-[347px]">
      <div
        className={`cursor-pointer ${
          selectedFilter === "Monthly"
            ? "bg-[#7E8299] h-full px-8 rounded-2xl flex items-center text-white "
            : "px-8"
        }`}
        onClick={() => onFilterChange("Monthly")}
      >
        Monthly
      </div>
      <div
        className={`cursor-pointer ${
          selectedFilter === "Weekly"
            ? "bg-[#7E8299] h-full px-8 rounded-2xl flex items-center text-white "
            : "px-8"
        }`}
        onClick={() => onFilterChange("Weekly")}
      >
        Weekly
      </div>
      <div
        className={`cursor-pointer  ${
          selectedFilter === "Today"
            ? "bg-[#7E8299] h-full px-8 rounded-2xl flex items-center text-white "
            : "px-8"
        }`}
        onClick={() => onFilterChange("Today")}
      >
        Today
      </div>
    </div>
  );
};

export default SwitchButton;
