import { atom } from "jotai";

interface FormState {
  fullName: string;
  organizationName: string;
  profilePicture: File | string | null;
}

export const defaultFormState: FormState = {
  fullName: "",
  organizationName: "",
  profilePicture: null,
};

export const defaultFormErrorState: FormState = {
  fullName: "",
  organizationName: "",
  profilePicture: null,
};

export const userProfileAtom = atom(defaultFormState);
export const userProfileErrorAtom = atom(defaultFormErrorState);
