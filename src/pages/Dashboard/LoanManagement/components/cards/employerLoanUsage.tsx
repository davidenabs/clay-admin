import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "../../../../../components/table/table";
import Divider from "../../../../../components/divider";
import { Button, Loader, Progressbar } from "rizzui";
import useNavigateTo from "../../../../../hooks/useNavigateTo";
import { calculateDueInDays, formatDate } from "../../../../../utils/dateUtils";
import { calculatePercentage } from "../../../../../utils/helpers";
import createApiManager from "../../../../../managers/apiManager";

interface Loan {
  _id: string;
  employerId: string;
  totalLoanAmount: number;
  amountRepaid: number;
  repaymentAmount: number;
  amountReceived: number;
  interest: number;
  dueDate: Date;
  staffLoans: string;
  isFullyRepaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface EmployerLoanUsageProps {
  loans: Loan[];
  loading: boolean;
}

const EmployerLoanUsage: React.FC<EmployerLoanUsageProps> = ({
  loans,
  loading,
}) => {
  const { navigateToStaffTransactions } = useNavigateTo();
  const [loanUsers, setLoanUsers] = useState<{ [key: string]: any }>({});
  const apiManager = createApiManager();

  useEffect(() => {
    const fetchUsers = async () => {
      const userPromises = loans.map(async (loan) => {
        const user = await apiManager.getEmployerById(loan.employerId);
        return { employerId: loan.employerId, user };
      });

      const users = await Promise.all(userPromises);
      const usersMap = users.reduce((acc, curr) => {
        acc[curr.employerId] = curr.user;
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
            Employer Loan History
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
                <TableCell className="!pl-12">Employer</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Amount Received</TableCell>
                <TableCell>Repayment Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created Date</TableCell>
              </TableHead>
              <TableBody>
                {loans.slice(0, 10).map((loan, index) => {
                  const user = loanUsers[loan.employerId]?.data || {};
                  const name = user?.profile?.organizationName || "N/A";
                  const phoneNumber = user.phoneNumber || "N/A";
                  const amountRepaid = loan.amountRepaid;
                  const repaymentAmount = loan.repaymentAmount;
                  const amountReceived = loan.amountReceived;
                  const totalLoanAmount = loan.totalLoanAmount;
                  const loanDate = formatDate(loan.createdAt, "MMMM d, yyyy");
                  const loanTime = formatDate(loan.createdAt, "hh:mm:ss a");
                  const dueDate = calculateDueInDays(loan.dueDate);
                  const loanUsageProgress = calculatePercentage(
                    totalLoanAmount,
                    amountReceived
                  );

                  return (
                    <TableRow key={index}>
                      <TableCell className="!pl-12">
                        <div>{name}</div>
                        <div className="mt-1 text-xs text-clayGray">
                          {phoneNumber}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col items-center text-xs">
                          <div>
                            ₦{totalLoanAmount} of ₦{amountReceived}
                          </div>
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
                        <div className="my-auto">₦{repaymentAmount}</div>
                      </TableCell>
                      <TableCell>
                        <div className="my-auto">
                          {loan.isFullyRepaid
                            ? "Fully Paid"
                            : "Repayment Pending"}
                        </div>
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
                          onClick={() => handleOnclick(loan.employerId)}
                        >
                          View Details
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
    </div>
  );
};

export default EmployerLoanUsage;
