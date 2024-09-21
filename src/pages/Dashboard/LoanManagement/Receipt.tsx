import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../components/table/table";
import Button from "../../../components/form/button";
import { useParams, useNavigate } from "react-router-dom";
import createApiManager from "../../../managers/apiManager";
import { Loader } from "rizzui";
import { useAtom } from "jotai";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import { Transaction } from "../../../types/transaction.types";

const Receipt = () => {
  const [transaction, setTransaction] = useState({} as Transaction);
  const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const fetchTransaction = async () => {
    try {
      const fetchedTransaction = await apiManager.getStaffSpendingById(
        transactionId
      );
      const data: Transaction = fetchedTransaction.data;
      setTransaction(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <>
      <div className="m-10 mb-20 max-md:max-w-full">
        <div className="flex flex-col py-5 mx-auto max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white min-h-52">
          {loading ? (
            <div className="flex justify-center items-center my-auto">
              <Loader variant="pulse" />
            </div>
          ) : transaction === null ? (
            <> No transactions found</>
          ) : (
            <div className="flex flex-col">
              <div className="flex-auto w-full px-6 text-[33px] font-extrabold text-blue">
                <div> Reference: {transaction.transactionId}</div>
                <div>{transaction?.staffData?.fullName || "N/A"}</div>
              </div>

              <Table className="text-[#04040B]">
                <TableHead className="border-b text-[#04040B]">
                  <TableCell className="!pl-6">Items</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell className="text-right pr-6">Total</TableCell>
                </TableHead>
                <TableBody>
                  {/* {[...Array(4)].map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="!pl-12 text-[#04040B]">
                        <div>Item 1</div>
                        <div className="mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>5</div>
                      </TableCell>
                      <TableCell>
                        <div>₦120.00</div>
                      </TableCell>
                      <TableCell className="pr-12 text-right">
                        <div className="my-auto">₦553,000,000.00</div>
                      </TableCell>
                    </TableRow>
                  ))} */}
                  <TableRow>
                    <TableCell colSpan="3" className="!pl-6">
                      <div>Total</div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      ₦{transaction?.transactionAmount}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan="3" className="!pl-6">
                      <div>Tax</div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      ₦{transaction.transactionSourceData?.meta.tax || 0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan="3" className="!pl-6">
                      <div>Discount</div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      %0
                      {/* ₦{transaction?.meta?.discount} */}
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-t">
                    <TableCell colSpan="3" className="!pl-6">
                      <div className="text-xl">Total</div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      ₦{transaction?.transactionAmount || 0}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="my-5 mx-auto">
                <Button onClick={() => navigate(-1)}>Done</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Receipt;
