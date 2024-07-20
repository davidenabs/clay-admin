import { atom } from "jotai";

interface FormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const defaultFormState: FormState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const defaultFormErrorState: FormState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const userPasswordAtom = atom(defaultFormState);
export const userPasswordErrorAtom = atom(defaultFormErrorState);
