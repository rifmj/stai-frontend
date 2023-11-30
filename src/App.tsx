import { ProtectedRoute } from "@/core/navigation/ProtectedRoute";
import { store } from "@/core/store";
import { StoreContext } from "@/core/store/StoreContext";
import { SignInPage } from "@/modules/auth/pages/SignInPage";
import { SignUpPage } from "@/modules/auth/pages/SignUpPage";
import { ChannelsListPage } from "@/modules/channels/pages/ChannelsListPage";
import { ChatPageView } from "@/modules/chats/pages/ChatPage";
import { ChatsListPage } from "@/modules/chats/pages/ChatsListPage";
import { FunctionsListPage } from "@/modules/functions/pages/FunctionsListPage";
import { KnowledgeBaseListPage } from "@/modules/knowledge-base/pages/KnowledgeBaseListPage";
import { KnowledgeBasePage } from "@/modules/knowledge-base/pages/KnowledgeBasePage";
import { ProjectsListPage } from "@/modules/projects/pages/ProjectsListPage";
import { SettingsPage } from "@/modules/settings/pages/SettingsPage";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
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
        element: <ChatsListPage />,
        path: "/chats",
      },
      {
        element: <ChatPageView />,
        path: "/chats/:chatId",
      },
      {
        element: <FunctionsListPage />,
        path: "/functions",
      },
      {
        element: <SettingsPage />,
        path: "/settings",
      },
      {
        element: <KnowledgeBaseListPage />,
        path: "/kb",
      },
      {
        element: <ProjectsListPage />,
        path: "/projects",
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
      <ModalsProvider>
        <StoreContext.Provider value={store}>
          <Notifications />
          <RouterProvider router={router} />
        </StoreContext.Provider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
