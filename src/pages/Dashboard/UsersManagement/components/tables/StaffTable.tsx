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

const statusColors = {
  requested: "#DF9757",
  pending: "#FFD329",
  rejected: "#D70000",
  approved: "#409900",
};

const StaffTable = ({ data, currentPage, handleOnclick }) => {
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
        {data.map((staff: StaffModel, index: number) => {
          const serialNumber = (currentPage - 1) * 10 + index + 1;
          const name = staff.fullName || "N/A";
          const phoneNumber = staff.phoneNumber || "N/A";
          const bvn = staff.bvn || "N/A";
          const status = staff.status;
          const staffId = staff.publicId;
          const createdAt = staff.createdAt || new Date();

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
