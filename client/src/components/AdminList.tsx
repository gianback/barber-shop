import { useAuthStore } from "@/store/auth.store";
import { Link } from "react-router-dom";

export function AdminList() {
  const isAdmin = useAuthStore((state) => state.isAdmin);

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
