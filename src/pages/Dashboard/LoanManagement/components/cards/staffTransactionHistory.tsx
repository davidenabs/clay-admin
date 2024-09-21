import Divider from "../../../../../components/divider";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import createApiManager from "../../../../../managers/apiManager";
import useNavigateTo from "../../../../../hooks/useNavigateTo";
import { Loader } from "rizzui";
import { formatDate } from "../../../../../utils/dateUtils";
import { maskNumber } from "../../../../../utils/helpers";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "../../../../../components/table/table";
import { useAtom } from "jotai";
import { apiLoadingAtom } from "../../../../../atoms/apiAtoms";
import { showErrorToast } from "../../../../../utils/toast";

function StaffTransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();
  const { navigateToLoanManagementShow } = useNavigateTo();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await apiManager.getStaffSpending();
        const data = fetchedTransactions.data.transactions;
        console.log(data);

        setTransactions(data);
      } catch (error) {
        showErrorToast(error.message);
      }
    };

    fetchTransactions();
  }, []);

  const handleOnclick = (id: string) => {
    navigateToLoanManagementShow(id);
  };
  return (
    <div className="lg:col-span-2 lg:pb-0 sm:pb-5">
      <div className="lex-col py-5 mx-auto max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white min-h-[420px]">
        <div className="flex gap-5 items-center w-full  px-8 lg:px-12 ">
          <div className="flex-auto text-xl font-medium tracking-normal leading-6 text-blue">
            Staff Transaction History
          </div>
          <NavLink
            to={"/loan-management/staff-transaction-history"}
            className="text-xs tracking-wide leading-4 text-brown"
          >
            See All
          </NavLink>
        </div>
        <Divider />
        {loading ? (
          <div className="flex justify-center my-auto">
            <Loader variant="pulse" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center my-auto p-10 text-clayGray">
            No transactions found
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <Table>
              <TableHead className="border-b">
                <TableCell className="!pl-12">Name</TableCell>
                <TableCell>Date/Time</TableCell>
                <TableCell>Amount/Card No.</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Action</TableCell>
              </TableHead>
              <TableBody>
                {transactions.slice(0, 5).map((transaction: any, index) => {
                  const name = transaction.staffData.fullName || "N/A";
                  const userId = transaction.userId;
                  const transactionId = transaction.transactionId;
                  const transactionDate = formatDate(
                    transaction.createdAt,
                    "MMMM d, yyyy"
                  );
                  const transactionTime = formatDate(
                    transaction.createdAt,
                    "hh:mm:ss a"
                  );
                  const amount = transaction.transactionAmount;
                  const store = transaction.merchantData.fullName;
                  const cardNo = maskNumber(
                    transaction.transactionSourceData.cardNumber
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell className="!pl-12">
                        <div className="">{name}</div>
                        <div className="mt-1 text-xs text-clayGray">
                          Ref: {userId}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{transactionDate}</div>
                        <div className="mt-1 text-xs text-clayGray uppercase">
                          {transactionTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>₦{amount}</div>
                        <div className="mt-1 text-xs text-clayGray">
                          {cardNo}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="my-auto">{store}</div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleOnclick(transactionId)}
                          className="my-auto underline cursor-pointer"
                        >
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StaffTransactionHistory;
