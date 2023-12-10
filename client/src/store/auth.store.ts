import { create } from "zustand";

interface AuthState {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
}));
