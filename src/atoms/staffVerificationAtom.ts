import { atom } from "jotai";

interface FormState {
  showPhoneNumberInput: boolean;
  methods: string[];
  phoneNumber: string;
  bvn: string;
  sessionId: string;
  userId: string;
}

export const defaultFormState: FormState = {
  showPhoneNumberInput: false,
  methods: [],
  phoneNumber: "",
  bvn: "",
  sessionId: "",
  userId: "",
};

export const verificationFormStateAtom = atom(defaultFormState);
