import React, { useState } from "react";
import { images } from "../../../assets";
import DashboardCard from "./dashboard-card";
import { formatNumber } from "../../../utils/helpers";
import BasicLineChart from "./chart";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Props = {};
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DashboardCalender = (props: Props) => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="shrink-0 rounded-lg shadow-lg bg-white h-[346px] w-ful flex item-center justify-center ">
      <Calendar className="!border-0" onChange={onChange} value={value} />
    </div>
  );
};

export default DashboardCalender;
