import { atom } from "jotai";

interface FormState {
  limit: number | null;
  pin: number | null;
  percentageCharge: number | null;
  cardholderName: string;
  fullName: string | null;
  employerId: string | null;
  status: string | null;
}

export const defaultFormState: FormState = {
  limit: null,
  pin: null,
  percentageCharge: null,
  cardholderName: "",
  fullName: "",
  employerId: "",
  status: "",
};

export const userAccountAtom = atom(defaultFormState);
