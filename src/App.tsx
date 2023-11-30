import { ProtectedRoute } from "@/core/navigation/ProtectedRoute";
import { store } from "@/core/store";
import { StoreContext } from "@/core/store/StoreContext";
import { SignInPage } from "@/modules/auth/pages/SignInPage";
import { SignUpPage } from "@/modules/auth/pages/SignUpPage";
import { ChannelsListPage } from "@/modules/channels/pages/ChannelsListPage";
import { FunctionsListPage } from "@/modules/functions/pages/FunctionsListPage";
import { KnowledgeBaseListPage } from "@/modules/knowledge-base/pages/KnowledgeBaseListPage";
import { KnowledgeBasePage } from "@/modules/knowledge-base/pages/KnowledgeBasePage";
import { MantineProvider, createTheme } from "@mantine/core";
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
      {
        element: <FunctionsListPage />,
        path: "/functions",
      },
      {
        element: <KnowledgeBaseListPage />,
        path: "/kb",
      },
      {
        element: <KnowledgeBasePage />,
        path: "/kb/:kbId",
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
