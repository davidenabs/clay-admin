import { atom } from "jotai";

export const initialFormValues = {
  email: "",
  password: "",
};

export const loginFormValuesAtom = atom(initialFormValues);

export const loginFormErrorValuesAtom = atom(initialFormValues);
