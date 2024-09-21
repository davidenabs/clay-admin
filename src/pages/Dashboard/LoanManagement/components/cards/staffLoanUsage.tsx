import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "../../../../../components/table/table";
import Divider from "../../../../../components/divider";
import React, { useEffect, useState } from "react";
import createApiManager from "../../../../../managers/apiManager";
import useNavigateTo from "../../../../../hooks/useNavigateTo";
import { Button, Loader } from "rizzui";
import { calculateDueInDays, formatDate } from "../../../../../utils/dateUtils";
import { calculatePercentage } from "../../../../../utils/helpers";
import { Progressbar } from "rizzui";
import { apiLoadingAtom } from "../../../../../atoms/apiAtoms";
import { useAtom } from "jotai";
import { showErrorToast } from "../../../../../utils/toast";

interface Loan {
  _id: string;
  staffId: string;
  employerLoanId: string;
  loanLimit: number;
  amountSpent: number;
  amountRepaid: number;
  amountReceived: number;
  lastTransactionAmount: number;
  dueDate: Date;
  isFullyRepaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface StaffLoanUsageProps {
  loans: Loan[];
  loading: boolean;
}


const StaffLoanUsage:  React.FC<StaffLoanUsageProps>  =({loans,
  loading }) => {
  // const [loans, setLoans] = useState([]);
  // const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();
  const { navigateToStaffTransactions } = useNavigateTo();
  const [loanUsers, setLoanUsers] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const userPromises = loans.map(async (loan) => {
        const user = await apiManager.getStaffById(loan.staffId);
        return { staffId: loan.staffId, user };
      });

      const users = await Promise.all(userPromises);
      const usersMap = users.reduce((acc, curr) => {
        acc[curr.staffId] = curr.user;
        return acc;
      }, {});
      setLoanUsers(usersMap);
    };

    if (loans.length > 0) {
      fetchUsers();
    }
  }, [loans]);

  const handleOnclick = (id: string) => {
    navigateToStaffTransactions(id);
  };

  return (
    <div className="">
      <div className="flex flex-col py-5 mx-auto max-w-full rounded-2xl shadow-lg w-full max-md:mt-3.5 bg-white">
        <div className="flex gap-5 w-full px-8 lg:px-12 ">
          <div className="flex-auto text-xl font-medium tracking-normal leading-6 text-blue">
            Staff Loan History
          </div>
        </div>
        <Divider />
        {loading ? (
          <div className="flex justify-center my-auto py-10">
            <Loader variant="pulse" />
          </div>
        ) : loans.length === 0 ? (
          <div className="text-center my-auto p-10 text-clayGray">
            No loan found
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <Table>
              <TableHead className="border-b">
                <TableCell className="!pl-12">Name</TableCell>
                <TableCell>Credit Usage</TableCell>
                <TableCell>Monthly Payment</TableCell>
                <TableCell>Loan Balance</TableCell>
                <TableCell>Date/Time</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell> </TableCell> */}
              </TableHead>
              <TableBody>
                {loans.slice(0, 5).map((loan: any, index) => {
                   const user = loanUsers[loan.staffId]?.data || {};
                  const name = user?.fullName || "N/A";
                  const phoneNumber = loan.user?.phoneNumber || "N/A";
                  const userId = loan.staffId;
                  const amountSpent = loan.amountSpent;
                  const loanLimit = loan.loanLimit;
                  const amountReceived = loan.amountReceived;
                  const loanBalance = amountReceived - amountSpent;
                  const loanDate = formatDate(loan.createdAt, "MMMM d, yyyy");
                  const loanTime = formatDate(loan.createdAt, "hh:mm:ss a");

                  const dueDate = calculateDueInDays(loan.dueDate);
                  const loanUsageProgress = calculatePercentage(
                    amountSpent,
                    loanLimit
                  );

                  return (
                    <TableRow key={index}>
                      <TableCell className="!pl-12">
                        <div className="">{name}</div>
                        <div className="mt-1 text-xs text-clayGray">
                          {phoneNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center text-xs">
                          <div>
                            ₦{amountSpent} of ₦{loanLimit}
                          </div>
                          {/* <div className="mt-2"> */}
                          <Progressbar
                            variant="solid"
                            value={loanUsageProgress}
                            className="mt-2 bg-gray-200"
                            color="primary"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>₦{amountReceived}</div>
                        <div className="mt-1 text-xs text-clayGray">
                          {dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="my-auto">₦{loanBalance}</div>
                      </TableCell>
                      <TableCell>
                        <div>{loanDate}</div>
                        <div className="mt-1 text-xs text-clayGray uppercase">
                          {loanTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="border-blue text-blue bg-transparent rounded-full"
                          onClick={() => handleOnclick(userId)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                      {/* <TableCell>
                      <img src={images.menuVerticalDotIcon} />
                    </TableCell> */}
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

export default StaffLoanUsage;
