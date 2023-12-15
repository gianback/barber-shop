import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
type Props = {
  children: React.ReactNode;
};

export function AuthIsntLoggedProvider({ children }: Props) {
  const token = Cookie.get("token");
  if (token) {
    return <Navigate to={"/"} />;
  }

  return children;
}
export function AuthIsLoggedProvider({ children }: Props) {
  const token = Cookie.get("token");
  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
