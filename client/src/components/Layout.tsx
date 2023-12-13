import { useAuth } from "@/hooks/useAuth";

import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  useAuth();

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
