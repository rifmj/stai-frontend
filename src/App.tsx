import { AppHeader } from "@/core/components/AppHeader";
import { AppNavbar } from "@/core/components/AppNavbar";
import { ProtectedRoute } from "@/core/navigation/ProtectedRoute";
import { store } from "@/core/store";
import { StoreContext } from "@/core/store/StoreContext";
import { SignInPage } from "@/modules/auth/pages/SignInPage";
import { SignUpPage } from "@/modules/auth/pages/SignUpPage";
import { ChannelsListPage } from "@/modules/channels/pages/ChannelsListPage";
import { AppShell, MantineProvider, createTheme } from "@mantine/core";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

const router = createBrowserRouter([
  {
    element: <SignInPage />,
    path: "/sign-in",
  },
  {
    element: <SignUpPage />,
    path: "/sign-in",
  },
  {
    children: [
      {
        element: <ChannelsListPage />,
        path: "/channels",
      },
    ],
    element: <ProtectedRoute />,
    path: "/",
  },
]);

const theme = createTheme({
  primaryColor: "green",
});

function App() {
  return (
    <MantineProvider defaultColorScheme={"dark"} theme={theme}>
      <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
      </StoreContext.Provider>
    </MantineProvider>
  );
}

export default App;
