import { create } from "zustand";

type State = {
  status: boolean;
  errorMessage: string;
};

type Action = {
  updateStatus: (status: State["status"]) => void;
  updateMessage: (errorMessage: State["errorMessage"]) => void;
};

export const useStatus = create<State & Action>((set) => ({
  status: false,
  loading: false,
  errorMessage: "",
  updateStatus: (status) => set(() => ({ status: status })),
  updateMessage: (errorMessage) => set(() => ({ errorMessage: errorMessage })),
}));
