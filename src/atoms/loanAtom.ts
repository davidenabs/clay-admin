import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { EmployerLoan } from "../types/transaction.types";

export const loanAtom = atomWithStorage<EmployerLoan>("loan-data", {} as EmployerLoan);
export const loanLoadingAtom = atom(false);
export const loanTotalPagesAtom = atom(1);
