import React from "react";
import { EmployerModel } from "../../../../../models/user";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../../../components/table/table";
import { formatDate, formatTime } from "../../../../../utils/dateUtils";


const EmployerTable = ({ data, currentPage, handleOnclick }) => {
  return (
    <>
      <TableHead className="border-b !text-blue">
        <TableCell className="pl-12">S/N</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Organization Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone Number</TableCell>
        <TableCell>Contact</TableCell>
        <TableCell>Employer ID</TableCell>
        <TableCell>Date/Time</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>
      <TableBody>
        {data.map((employer: EmployerModel, index: number) => {
          const serialNumber = (currentPage - 1) * 10 + index + 1;
          const name = employer.fullName || "N/A";
          const organizationName = employer.organizationName || "N/A";
          const email = employer.email || "N/A";
          const phoneNumber = employer.phoneNumber || "N/A";
          const contact = employer.contact || "N/A";
          const employerId = employer.publicId;
          const createdAt = employer.createdAt || new Date();

          return (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="pl-12">{serialNumber}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{organizationName}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
              <TableCell>{contact}</TableCell>
              <TableCell>{employerId}</TableCell>
              <TableCell>
                <div>{formatDate(createdAt)}</div>
                <div className="mt-1 text-xs text-clayGray">{formatTime(createdAt)}</div>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleOnclick(employerId)}
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

export default EmployerTable;

