import {
  AuthIsLoggedProvider,
  AuthIsntLoggedProvider,
} from "@/components/providers/AuthProvider";
import { Layout } from "@/components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Contact,
  CreateBlog,
  CreateService,
  Home,
  Login,
  Register,
} from "@/pages";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          {/* 
          TODO: VALIDAR SI HAY TOKEN */}
          <Route
            path="/contact"
            element={
              <AuthIsLoggedProvider>
                <Contact />
              </AuthIsLoggedProvider>
            }
          />
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
