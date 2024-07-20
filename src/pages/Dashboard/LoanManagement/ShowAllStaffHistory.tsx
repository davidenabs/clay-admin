import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../components/table/table";
import SwitchButton from "./components/switch-button";
import { useAtom } from "jotai";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import createApiManager from "../../../managers/apiManager";
import { showErrorToast } from "../../../utils/toast";
import { formatDate, formatTime } from "../../../utils/dateUtils";
import useNavigateTo from "../../../hooks/useNavigateTo";
import { Loader } from "rizzui";
import { formatNumberWithCommas, maskNumber } from "../../../utils/helpers";
import InputField from "../../../components/form/input";
import useSearch from "../../../hooks/useSearch";
import dayjs from "dayjs";

const StaffTransactionHistory = () => {
  const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();
  const [transactions, setTransactions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const { navigateToLoanManagementShow } = useNavigateTo();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const fetchedTransactions = await apiManager.getStaffSpending();
        const data = fetchedTransactions.data.transactions;
        setTransactions(data);
      } catch (error) {
        showErrorToast(error.message);
      }
    };

    fetchTransactions();
  }, []);

  const handleOnclick = (id) => {
    navigateToLoanManagementShow(id);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filterTransactions = (transactions, filter) => {
    const now = dayjs();
    switch (filter) {
      case "Monthly":
        return transactions.filter((transaction) =>
          dayjs(transaction.createdAt).isSame(now, "month")
        );
      case "Weekly":
        return transactions.filter((transaction) =>
          dayjs(transaction.createdAt).isSame(now, "week")
        );
      case "Today":
        return transactions.filter((transaction) =>
          dayjs(transaction.createdAt).isSame(now, "day")
        );
      default:
        return transactions;
    }
  };

  const filteredTransactions = filterTransactions(transactions, selectedFilter);

  // const {
  //   searchQuery,
  //   setSearchQuery,
  //   filteredData: filteredStaffs,
  // } = useSearch(filteredTransactions, [
  //   "publicId",
  //   "fullName",
  //   "email",
  //   "phoneNumber",
  //   "bvn",
  // ]);

  return (
    <div className="m-10 mb-20 max-md:max-w-full">
      <div className="flex flex-col py-5 mx-auto max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white">
        <div className="flex justify-end px-8 lg:px-12 py4">
          <InputField
            label=""
            type="search"
            name="search"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={"Search transactions..."}
            error={""}
            className="!rounded-full !border-clayGray"
          />
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Loader variant="pulse" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center my-auto p-10 text-clayGray">
            No transactions found
          </div>
        ) : filteredTransactions.length == 0 ? (
          <div className="text-center my-auto p-10 text-clayGray">
            No transactions for <span className="lowercase">{selectedFilter}</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHead className="border-b !text-blue">
                  <TableCell>
                    <></>
                  </TableCell>
                  <TableCell>Staff Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Card No.</TableCell>
                  <TableCell>Store</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableHead>
                <TableBody>
                  {filteredTransactions
                    .slice(0, 10)
                    .map((transaction, index) => {
                      const merchant = transaction.merchantData;
                      const transactionId = transaction.transactionId;
                      const transactionAmount = formatNumberWithCommas(
                        transaction.transactionAmount
                      );
                      const userName = transaction.staffData || "Hassan Abdul";
                      const userId =
                        transaction.staffData?.publicId || "1203948384";
                      const phoneNumber =
                        transaction.staffData?.phoneNumber || "08177777777";
                      const cardNo = maskNumber(
                        transaction.transactionSourceData.cardNumber
                      );
                      const transactionDate = formatDate(
                        transaction.createdAt,
                        "MMMM d, yyyy"
                      );
                      const transactionTime = formatTime(
                        transaction.createdAt,
                        "hh:mm:ss a"
                      );
                      return (
                        <TableRow key={index}>
                          <TableCell className="px12">
                            <></>
                          </TableCell>
                          <TableCell className="">
                            <div className="">{userName}</div>
                            <div className="mt-1 text-xs text-clayGray">
                              Ref: {userId}
                            </div>
                          </TableCell>
                          <TableCell className="px-12">
                            <div>{phoneNumber}</div>
                          </TableCell>
                          <TableCell className="px-12">
                            <div>₦{transactionAmount}</div>
                          </TableCell>
                          <TableCell className="px-12">{cardNo}</TableCell>
                          <TableCell className="px-12">
                            <div className="my-auto">
                              {merchant["fullName"]}
                            </div>
                          </TableCell>
                          <TableCell className="px-12">
                            <div>{transactionDate}</div>
                            <div className="mt-1 text-xs text-clayGray">
                              {transactionTime}
                            </div>
                          </TableCell>
                          <TableCell className="px-12">
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
          </>
        )}
        <div className="px-12 py-6">
          <SwitchButton
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffTransactionHistory;
