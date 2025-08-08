import React from "react";
import { useAuthStore } from "./store/auth";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/auth/LoginPage";
import { PageProvider } from "./store/page";
import ControlPage from "./components/ControlPage";
import { seedIfEmpty } from "./services/seed";

seedIfEmpty();

export default function App() {
  const isAuth = useAuthStore((s) => s.isAuthenticated);

  return (
    <PageProvider initialPage={{ name: isAuth ? "dashboard" : "login" }}>
      {isAuth ? (
        <Layout>
          <ControlPage />
        </Layout>
      ) : (
        <LoginPage />
      )}
    </PageProvider>
  );
}