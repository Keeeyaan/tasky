import { create } from "zustand";

interface AuthStore {
  auth: {
    accessToken: string;
  };
  setAuth: (data: { accessToken: string }) => void;
}

export const useStore = create<AuthStore>((set) => ({
  auth: {
    accessToken: "",
  },
  setAuth: (data) => set(() => ({ auth: data })),
}));
