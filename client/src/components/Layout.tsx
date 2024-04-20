import { Outlet, useLocation } from "react-router-dom";
import { useCallback, useLayoutEffect } from "react";
import JsCookie from "js-cookie";

import { Footer, Header } from ".";
import { verifyTokenService } from "@/services/token.service";
import { useUserStore } from "@/store/user.store";
import { scrollToTop } from "@/lib/utils";
import { controller } from "@/lib/abort-controller";

export function Layout() {
  const { pathname } = useLocation();
  const { resetUser } = useUserStore();
  useLayoutEffect(() => {
    scrollToTop();
  }, [pathname]);

  const verifyToken = useCallback(async () => {
    try {
      await verifyTokenService();
    } catch (error) {
      resetUser();
      JsCookie.remove("token");
    }
  }, [resetUser]);

  useLayoutEffect(() => {
    verifyToken();
    return () => {
      controller.abort();
    };
  }, [verifyToken]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
