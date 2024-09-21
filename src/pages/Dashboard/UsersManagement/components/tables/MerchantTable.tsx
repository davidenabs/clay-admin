import React from "react";
import { MerchantModel } from "../../../../../models/user";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../../../components/table/table";
import { formatDate, formatTime } from "../../../../../utils/dateUtils";


const MerchantTable = ({ data, currentPage, handleOnclick }) => {
  return (
    <>
      <TableHead className="border-b !text-blue">
        <TableCell className="pl-12">S/N</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Store Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone Number</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Merchant ID</TableCell>
        <TableCell>Date/Time</TableCell>
        <TableCell>Action</TableCell>
      </TableHead>
      <TableBody>
        {data.map((merchant: MerchantModel, index: number) => {
          const serialNumber = (currentPage - 1) * 10 + index + 1;
          const name = merchant.fullName || "N/A";
          const storeName = merchant.storeName || "N/A";
          const email = merchant.email || "N/A";
          const phoneNumber = merchant.phoneNumber || "N/A";
          const address = merchant.address || "N/A";
          const merchantId = merchant.publicId;
          const createdAt = merchant.createdAt || new Date();

          return (
            <TableRow key={index} className="border-b border-gray-100">
              <TableCell className="pl-12">{serialNumber}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{storeName}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{merchantId}</TableCell>
              <TableCell>
                <div>{formatDate(createdAt)}</div>
                <div className="mt-1 text-xs text-clayGray">{formatTime(createdAt)}</div>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleOnclick(merchantId)}
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

export default MerchantTable;

