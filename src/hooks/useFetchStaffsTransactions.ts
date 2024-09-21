import { useAtom } from "jotai";
import { useEffect } from "react";
import createApiManager from "../managers/apiManager";
import { transactionAtom, transactionLoadingAtom, transactionTotalPagesAtom } from "../atoms/staffsTransactionsAtom";
import { TransactionResponse } from "../types/transaction.types";

const useFetchStaffsTransactions = (page = 1, itemsPerPage = 10) => {
  const [transactions, setTransactions] = useAtom(transactionAtom);
  const [tLoading, setIsLoading] = useAtom(transactionLoadingAtom);
  const [tTotalPages, setTotalPages] = useAtom(transactionTotalPagesAtom);
  const apiManager = createApiManager();

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const fetch = await apiManager.getStaffSpending();
        const data: TransactionResponse = fetch.data;
        setTransactions(data);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchStaffs();
  }, [page, itemsPerPage]);

  return { transactions, tLoading, tTotalPages };
};

export default useFetchStaffsTransactions;

