import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    name: string;
    surname: string;
  };
  setUser: (user: { name: string; surname: string }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        name: "",
        surname: "",
      },
      setUser: (user) => set({ user }),
    }),
    { name: "user-store" }
  )
);
