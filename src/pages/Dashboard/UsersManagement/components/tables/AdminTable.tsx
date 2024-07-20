import React from "react";
import { AdminModel } from "../../../../../models/user";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../../../components/table/table";
import { formatDate, formatTime } from "../../../../../utils/dateUtils";

const AdminTable = ({ data, currentPage, handleOnclick }) => {
  return (
    <>
      <TableHead className="border-b !text-blue">
        <TableCell className="pl-12">S/N</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone Number</TableCell>
        {/* <TableCell>Status</TableCell> */}
        <TableCell>Admin ID</TableCell>
        <TableCell>Date/Time</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>
      <TableBody>
        {data.map((admin: AdminModel, index: number) => {
          const serialNumber = (currentPage - 1) * 10 + index + 1;
          const name = admin.fullName || "N/A";
          const email = admin.email || "N/A";
          const phoneNumber = admin.phoneNumber || "N/A";
          //   const status = admin.status;
          const adminId = admin.publicId;
          const createdAt = admin.createdAt || new Date();

          return (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="pl-12">{serialNumber}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
              {/* <TableCell>
                <div
                  className="text-white p-1 capitalize text-sm px-2 text-center rounded-full"
                  style={{ backgroundColor: statusColors[status] }}
                >
                  {status}
                </div>
              </TableCell> */}
              <TableCell>{adminId}</TableCell>
              <TableCell>
                <div>{formatDate(createdAt)}</div>
                <div className="mt-1 text-xs text-clayGray">
                  {formatTime(createdAt)}
                </div>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleOnclick(adminId)}
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

export default AdminTable;
