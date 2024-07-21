import { atom } from "jotai";

interface FormState {
  limit: number | null;
  pin: number | null;
  percentageCharge: number | null;
  cardholderName: string;
}

export const defaultFormState: FormState = {
  limit: null,
  pin: null,
  percentageCharge: null,
  cardholderName: "",
};

export const userAccountAtom = atom(defaultFormState);
