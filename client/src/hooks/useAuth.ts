import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.store";
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const { pathname } = useLocation();
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
      setUser({ name: "", surname: "" });
      if (pathname !== "/") {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  }, [setIsAdmin, setUser, navigate, pathname]);

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
