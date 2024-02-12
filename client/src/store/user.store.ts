import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    name: string;
    surname: string;
    lastname: string;
  };
  setUser: (user: { name: string; surname: string; lastname: string }) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        name: "",
        surname: "",
        lastname: "",
      },
      setUser: (user) => set({ user }),
    }),
    { name: "user-store" }
  )
);
