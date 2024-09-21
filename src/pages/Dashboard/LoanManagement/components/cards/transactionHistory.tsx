import Divider from "../../../../../components/divider";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../../../../components/table/table";
import createApiManager from "../../../../../managers/apiManager";
import useNavigateTo from "../../../../../hooks/useNavigateTo";
import { Loader } from "rizzui";
import { formatDate } from "../../../../../utils/dateUtils";
import { maskNumber } from "../../../../../utils/helpers";
import Pagination from "../pagination";
import useSearch from "../../../../../hooks/useSearch";
import InputField from "../../../../../components/form/input";

function TransactionHistory(props: any) {
  const userId = props.userId;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const apiManager = createApiManager();
  const { navigateToLoanManagementShow } = useNavigateTo();

  const {
    searchQuery,
    setSearchQuery,
    filteredData: filteredTransactions,
  } = useSearch(transactions, [
    "transactionSourceData.cardNumber",
    "staffData.fullName",
    "staffData.phoneNumber",
    "staffData.bvn",
  ]);

  useEffect(() => {
    const fetchTransactions = async (page: number) => {
      setIsLoading(true);
      try {
        const fetchedTransactions = await apiManager.getStaffTransactions(
          userId,
          page,
          itemsPerPage
        );
        const data = fetchedTransactions.data.transactions;
        setTransactions(data);
        setTotalPages(fetchedTransactions.data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions(currentPage);
  }, [userId, currentPage]);

  const handleOnclick = (id: string) => {
    navigateToLoanManagementShow(id);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col py-5 mx-auto max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white">
      <div className="flex justify-between items-center text-xl px-8 lg:px-12 font-medium tracking-normal leading-6 text-blue">
        Loan History
        <InputField
          label=""
          type="search"
          name="search"
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
          placeholder={"Search transactions..."}
          error={""}
          className="!rounded-full !border-clayGray"
        />
      </div>

      <Divider />
      {isLoading ? (
        <div className="flex justify-center my-auto py-10">
          <Loader variant="pulse" />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center my-auto p-10 text-clayGray">
          No transactions found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHead className="border-b">
              <TableCell className="!pl-12">S/N</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>BVN</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Date/Time</TableCell>
              <TableCell className="!pr-12">Action</TableCell>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction: any, index) => {
                const serialNumber =
                  (currentPage - 1) * itemsPerPage + index + 1;
                const name = transaction.staffData?.fullName || "Hassan Abdu";
                const phoneNumber =
                  transaction.staffData?.phoneNumber || "07066048649";
                const bvn = transaction.staffData?.bvn || "NN599567777";
                const status = transaction.transactionSourceData.status;
                const transactionId = transaction.transactionId;
                const transactionDate = formatDate(
                  transaction.createdAt,
                  "MMMM d, yyyy"
                );
                const transactionTime = formatDate(
                  transaction.createdAt,
                  "hh:mm:ss a"
                );
                const cardNo = maskNumber(
                  transaction.transactionSourceData.cardNumber
                );
                return (
                  <TableRow key={index} className="border-b border-gray-100">
                    <TableCell className="pl-12">{serialNumber}</TableCell>
                    <TableCell>
                      <div>{name}</div>
                    </TableCell>
                    <TableCell>
                      <div>{phoneNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div>{bvn}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-green-700 capitalize">{status}</div>
                    </TableCell>
                    <TableCell>
                      <div>{cardNo}</div>
                    </TableCell>
                    <TableCell>
                      <div>{transactionDate}</div>
                      <div className="mt-1 text-xs text-clayGray">
                        {transactionTime}
                      </div>
                    </TableCell>
                    <TableCell className="pr-12">
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;
