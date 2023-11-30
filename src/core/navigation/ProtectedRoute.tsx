import { AppHeader } from "@/core/components/AppHeader";
import { AppNavbar } from "@/core/components/AppNavbar";
import { useAuth } from "@/core/user/useAuth";
import { AppShell } from "@mantine/core";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/sign-in");
  }
  return (
    <AppShell
      navbar={{
        breakpoint: "sm",
        collapsed: { mobile: true },
        width: 300,
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header p={"sm"}>
        <AppHeader />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNavbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
