import React from "react";
// import { StaffModel } from "../../../../../models/user";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../../../components/table/table";
import { formatDate, formatTime } from "../../../../../utils/dateUtils";
import StaffModel from "../../../../../models/staff";
import useNavigateTo from "../../../../../hooks/useNavigateTo";

const statusColors = {
  requested: "#DF9757",
  pending: "#FFD329",
  rejected: "#D70000",
  approved: "#409900",
};

const StaffTable = ({ data, currentPage }) => {
  const { navigateToStaffProfile } = useNavigateTo();
  const handleOnclick = (id: string) => {
    navigateToStaffProfile(id);
  };
  return (
    <>
      <TableHead className="border-b !text-blue">
        <TableCell className="pl-12">S/N</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Phone Number</TableCell>
        <TableCell>BVN</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Staff ID</TableCell>
        <TableCell>Date/Time</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>
      <TableBody>
        {data.map((staff: any, index: number) => {
          const serialNumber = (currentPage - 1) * 10 + index + 1;
          const name = staff?.user?.fullName || "N/A";
          const phoneNumber = staff?.user?.phoneNumber || "N/A";
          const bvn = staff?.user?.bvn || "N/A";
          const status = staff?.user?.status;
          const staffId = staff?.user?.publicId;
          const createdAt = staff?.user?.createdAt || new Date();

          return (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="pl-12">{serialNumber}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
              <TableCell>{bvn}</TableCell>
              <TableCell>
                <div
                  className="text-white p-1 capitalize text-sm px-2 text-center rounded-full"
                  style={{ backgroundColor: statusColors[status] }}
                >
                  {status}
                </div>
              </TableCell>
              <TableCell>{staffId}</TableCell>
              <TableCell>
                <div>{formatDate(createdAt)}</div>
                <div className="mt-1 text-xs text-clayGray">
                  {formatTime(createdAt)}
                </div>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleOnclick(staffId)}
                  className="my-auto underline cursor-pointer"
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default StaffTable;
