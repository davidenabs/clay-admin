import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { TransactionResponse } from "../types/transaction.types";

export const transactionAtom = atomWithStorage<TransactionResponse>("transaction-data", {} as TransactionResponse);
export const transactionLoadingAtom = atom(false);
export const transactionTotalPagesAtom = atom(1);
