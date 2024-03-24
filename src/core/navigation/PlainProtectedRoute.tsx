import { useAuth } from "@/core/user/useAuth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PlainProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    navigate("/sign-in");
    return;
  }
  return <Outlet />;
};
