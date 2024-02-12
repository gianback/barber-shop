import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function AdminList() {
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const { verifyRoll } = useAuth();

  useEffect(() => {
    verifyRoll();
  }, [verifyRoll]);

  return (
    <>
      {isAdmin && (
        <>
          <li>
            <Link to="/create-service">Create Service</Link>
          </li>
          <li>
            <Link to="/create-blog">Create Blog</Link>
          </li>
        </>
      )}
    </>
  );
}
