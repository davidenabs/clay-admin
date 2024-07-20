import React, { useEffect, useState } from "react";
import StaffLoanUsage from "./components/cards/staffLoanUsage";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import createApiManager from "../../../managers/apiManager";
import { useAtom } from "jotai";
import EmployerLoanUsage from "./components/cards/employerLoanUsage";
import { showErrorToast } from "../../../utils/toast";

const LoanManagement = () => {
  const [staffLoan, setStaffLoan] = useState([]);
  const [employerLoan, setEmployerLoan] = useState([]);
  const [loading] = useAtom(apiLoadingAtom);
  const apiManager = createApiManager();

  const fetchStaffLoans = async () => {
    try {
      const staffLoan = await apiManager.getStaffsLoans();
      const data = staffLoan.data.loans;
      setStaffLoan(data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const fetchEmployersLoans = async () => {
    try {
      const loan = await apiManager.getEmployersLoans();
      const data = loan.data.loans;
      setEmployerLoan(data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchStaffLoans();
    fetchEmployersLoans();
  }, []);

  return (
    <>
      <div className="z10 m-10 pb-10 space-y-10 max-md:mr-2.5 max-md:max-w-full">
        <EmployerLoanUsage loans={employerLoan} loading={loading} />
        <StaffLoanUsage loans={staffLoan} loading={loading} />
      </div>
    </>
  );
};

export default LoanManagement;
