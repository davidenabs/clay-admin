import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart() {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [20, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return (
    <LineChart
    series={[
        { data: pData, color: "#EB9349" },
        
        // { data: uData, label: 'uv' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      height={450}
    />
  );
}
