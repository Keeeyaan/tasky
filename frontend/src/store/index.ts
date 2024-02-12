import { create } from "zustand";

interface AuthStore {
  sidebarIsClosed: boolean;
  auth: {
    accessToken: string;
  };
  setSidebarIsClosed: () => void;
  setAuth: (data: { accessToken: string }) => void;
}

export const useStore = create<AuthStore>((set) => ({
  sidebarIsClosed: false,
  auth: {
    accessToken: "",
  },
  setSidebarIsClosed: () =>
    set((state) => ({ sidebarIsClosed: !state.sidebarIsClosed })),
  setAuth: (data) => set(() => ({ auth: data })),
}));
