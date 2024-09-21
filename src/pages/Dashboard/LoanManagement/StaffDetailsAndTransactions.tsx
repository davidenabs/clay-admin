import React, { useEffect, useState } from "react";
import StaffCard from "./components/cards/staffCard";
import TransactionHistory from "./components/cards/transactionHistory";
import { useParams } from "react-router-dom";
import EmployerLoanUsage from "./components/cards/employerLoanUsage";
import { useAtom } from "jotai";
import { apiLoadingAtom } from "../../../atoms/apiAtoms";
import { getPrefix } from "../../../utils/helpers";
import createApiManager from "../../../managers/apiManager";
import { showErrorToast } from "../../../utils/toast";

const StaffDetailsAndTransactions = () => {
  const { id } = useParams();
  const [loading] = useAtom(apiLoadingAtom);
  const prefix: string = getPrefix(id).toLowerCase();
  const apiManager = createApiManager();
  const [employerLoan, setEmployerLoan] = useState([]);

  const fetchEmployerLoans = async () => {
    try {
      const loan = await apiManager.getEmployerLoans(id);
      const data = loan.data.loans;
      setEmployerLoan(data);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    fetchEmployerLoans();
  }, []);

  return (
    <>
      <div className="m-10 max-md:max-w-full space-y-10">
        <StaffCard userId={id} prefix={prefix} loading={loading} />
        <EmployerLoanUsage loans={employerLoan} loading={loading} />
        <div></div>
      </div>
    </>
  );
};

export default StaffDetailsAndTransactions;
