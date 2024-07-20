import { useAtom } from "jotai";
import { useEffect } from "react";
import createApiManager from "../managers/apiManager";
import { EmployerLoan } from "../types/transaction.types";
import { loanAtom, loanLoadingAtom, loanTotalPagesAtom } from "../atoms/loanAtom";

const activeLoan = () => {
  const [loan, setLaon] = useAtom(loanAtom);
  const [lLoading, setIsLoading] = useAtom(loanLoadingAtom);
  const apiManager = createApiManager();

  useEffect(() => {
    const fetchStaffs = async () => {
      setIsLoading(true);
      try {
        const fetch = await apiManager.getActiveLoan();
        const data: EmployerLoan = fetch.data;
        setLaon(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStaffs();
  }, []);

  return { loan, lLoading };
};

export default activeLoan;

