import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

interface AppState {
  showAuthTabs: boolean;
  openNavDrawer: boolean;
  hasSeenIntro: boolean;
  dashboardTitle: string;
  dahboardDrawerFooterContent: React.ReactNode | null;
  isProfileMdaSetup: boolean;
  isSidebarOpen: boolean;
}

export const defaultApp: AppState = {
  showAuthTabs: true,
  openNavDrawer: false,
  hasSeenIntro: false,
  dashboardTitle: "",
  dahboardDrawerFooterContent: null,
  isProfileMdaSetup: false,
  isSidebarOpen: false,
};

// export const appAtom = atomWithStorage("gsp-app", defaultApp);
export const appAtom = atom(defaultApp);
export const clearAppAtom = atom(null, (_get, set, _data) => {
  return set(appAtom, defaultApp);
});

export const showAuthTabsAtom = atom(
  (get) => get(appAtom).showAuthTabs,
  (get, set, data: boolean) => {
    const prev = get(appAtom);
    return set(appAtom, { ...prev, showAuthTabs: data });
  }
);

export const openNavDrawerAtom = atom(
  (get) => get(appAtom).openNavDrawer,
  (get, set, data: boolean) => {
    const prev = get(appAtom);
    return set(appAtom, { ...prev, openNavDrawer: data });
  }
);

export const hasSeenIntroAtom = atom(
  (get) => get(appAtom).hasSeenIntro,
  (get, set, data: boolean) => {
    const prev = get(appAtom);
    return set(appAtom, { ...prev, hasSeenIntro: data });
  }
);
