import { atom } from "jotai";

interface AppState {
  loading: boolean;
  error: any;
  success: any;
  dashboardTitle: string;
  isSidebarOpen: boolean;
}

export const defaultApp: AppState = {
  loading: false,
  error: null,
  success: null,
  dashboardTitle: "",
  isSidebarOpen: true,
};

export const appAtom = atom(defaultApp);
export const clearAppAtom = atom(null, (_get, set, _data) => {
  return set(appAtom, defaultApp);
});
