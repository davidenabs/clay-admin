import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { StaffResponse } from "../types/staff.types";

export const staffAtom = atomWithStorage<StaffResponse>("staff-data", {} as StaffResponse);
export const staffLoadingAtom = atom(false);
export const staffTotalPagesAtom = atom(1);
