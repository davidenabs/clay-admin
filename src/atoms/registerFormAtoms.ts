import { atom } from "jotai";

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
  message: string;
}

export const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
  message: "",
};

export const registerFormValuesAtom = atom(initialFormValues);

export const registerFormErrorValuesAtom = atom({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreeTerms: "",
  message: "",
});
