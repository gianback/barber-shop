import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setIsAdmin = useAuthStore().setIsAdmin;

  const verifyRoll = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/auth/verify-roll");
      setIsAdmin(data.status === 200);
    } catch (error) {
      throw new Error("Error not include");
    } finally {
      setIsLoading(false);
    }
  }, [setIsAdmin]);

  const verifyToken = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/auth/verify-token");
      setIsAdmin(data.status === 200);
    } catch (error) {
      Cookies.remove("token");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [setIsAdmin, navigate]);

  useEffect(() => {
    verifyToken();
    verifyRoll();
  }, [verifyToken, verifyRoll]);

  return {
    isLoading,
    verifyRoll,
    verifyToken,
  };
}
