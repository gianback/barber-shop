import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const setIsAdmin = useAuthStore().setIsAdmin;
  const verifyRoll = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/auth/verify-roll", {
        withCredentials: true,
      });
      setIsAdmin(data.status === 200);
    } catch (error) {
      throw new Error("Error not include");
    } finally {
      setIsLoading(false);
    }
  }, [setIsAdmin]);
  useEffect(() => {
    verifyRoll();
  }, [verifyRoll]);
  return {
    isLoading,
    verifyRoll,
  };
}
