import { atom } from "jotai";

export const apiLoadingAtom = atom(false);
export const apiErrorAtom = atom(null);
export const apiSuccessAtom = atom(null);

export const apiSideEffectsAtom = atom(
  (get) => ({
    success: get(apiSuccessAtom),
    error: get(apiErrorAtom),
  }),
  (get, set) => {
    const { success, error } = get(apiSideEffectsAtom);

    if (success && success.status === "success") {
      showSuccessToast("Login successful!");
      set(apiSuccessAtom, null); // Reset success state
      set(apiErrorAtom, null); // Reset error state
    } else if (error) {
      showErrorToast(error.message);
      set(apiErrorAtom, null); // Reset error state
    }
  }
);
