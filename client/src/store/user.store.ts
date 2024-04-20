import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: {
    name: string;
    surname: string;
    lastname: string;
    email: string;
  };
  setUser: (user: {
    name: string;
    surname: string;
    lastname: string;
    email: string;
  }) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        name: "",
        surname: "",
        lastname: "",
        email: "",
      },
      setUser: (user) => set({ user }),
      resetUser: () =>
        set({
          user: {
            name: "",
            lastname: "",
            surname: "",
            email: "",
          },
        }),
    }),
    { name: "user-store" }
  )
);
