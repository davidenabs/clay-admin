import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../../../../components/table/table";
import React from "react";
import { Loader } from "rizzui";
import { formatDate, formatTime } from "../../../../utils/dateUtils";
import { Button } from "rizzui";
import useNavigateTo from "../../../../hooks/useNavigateTo";
import { useAtom } from "jotai";
import { apiLoadingAtom } from "../../../../atoms/apiAtoms";
import useFetchStaffsTransactions from "../../../../hooks/useFetchStaffsTransactions";

function StaffHistoryCard() {
  const { navigateToLoanManagementShow } = useNavigateTo();
  const [loading] = useAtom(apiLoadingAtom);
  const { transactions, tLoading, tTotalPages } = useFetchStaffsTransactions();

  const handleOnclick = (id: string) => {
    navigateToLoanManagementShow(id);
  };

  return (
    <div className="flex flex-col mt-10 mb-20 px-6 py-7 rounded-2xl bg-white shadow-lg">
      <div className="flex gap-5 justify-between px-3 py-5 mt-1.5 max-w-full w-[1064px] max-md:flex-wrap">
        <div className="flex flex-col">
          <div className="text-2xl font-medium leading-10 text-[color(display-p3_0.2941_0.149_0.051)]">
            Staff Purchase History
          </div>
          <div className="text-base leading-7 text-[color(display-p3_0.5412_0.5725_0.651)]">
            0 New Orders this month
          </div>
        </div>
        <div></div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <Loader variant="pulse" />
        </div>
      ) : transactions.transactions?.length === 0 ? (
        <div className="text-center my-auto p-10 text-clayGray">
          {" "}
          No transactions found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHead className="border-b !text-blue">
              <TableCell>STORE LOCATION</TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>STAFF ID</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TIME</TableCell>
              <TableCell>ACTION</TableCell>
            </TableHead>
            <TableBody>
              {transactions.transactions?.slice(0, 10).map((transaction: any, index) => {
                const merchant = transaction.merchantData;
                const formattedDate = formatDate(transaction.createdAt);
                const formattedTime = formatTime(transaction.createdAt);

                return (
                  <TableRow
                    key={index}
                    className="mt-5 text-base border-b border-gray-100 text-brown"
                  >
                    <TableCell className="py-5 my-auto">
                      {merchant["fullName"]}
                    </TableCell>
                    <TableCell className="py-5 my-auto">
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell className="py-5 my-auto">
                      {transaction.userId}
                    </TableCell>
                    <TableCell className="py-5 my-auto">
                      ₦{transaction.transactionAmount}
                    </TableCell>
                    <TableCell className="py-5 my-auto">
                      {formattedDate}
                    </TableCell>
                    <TableCell className="py-5 my-auto">
                      {formattedTime}
                    </TableCell>
                    <TableCell className="">
                      <Button
                        className="border-blue text-blue bg-transparent rounded-full"
                        onClick={() => handleOnclick(transaction.transactionId)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default StaffHistoryCard;
