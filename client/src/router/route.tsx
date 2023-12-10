import { AuthIsntLoggedProvider } from "@/components/providers/AuthProvider";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateService } from "@/pages/CreateService";
import { Register } from "@/pages/Register";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-service" element={<CreateService />} />
        </Route>
        <Route
          path="/login"
          element={
            <AuthIsntLoggedProvider>
              <Login />
            </AuthIsntLoggedProvider>
          }
        />
        <Route
          path="/register"
          element={
            <AuthIsntLoggedProvider>
              <Register />
            </AuthIsntLoggedProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
