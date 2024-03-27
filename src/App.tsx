import { PlainProtectedRoute } from "@/core/navigation/PlainProtectedRoute";
import { ProtectedRoute } from "@/core/navigation/ProtectedRoute";
import useSocket from "@/core/socket/useSocket";
import { store } from "@/core/store";
import { StoreContext } from "@/core/store/StoreContext";
import { useMobXStore } from "@/core/store/useMobXStore";
import { SignInPage } from "@/modules/auth/pages/SignInPage";
import { SignUpPage } from "@/modules/auth/pages/SignUpPage";
import { ChannelsListPage } from "@/modules/channels/pages/ChannelsListPage";
import { ChatPageView } from "@/modules/chats/pages/ChatPage";
import { ChatsListPage } from "@/modules/chats/pages/ChatsListPage";
import { AddClientPlainPage } from "@/modules/clients/pages/AddClientsPlainPage";
import { ClientsListPage } from "@/modules/clients/pages/ClientsListPage";
import { ClientsListPlainPage } from "@/modules/clients/pages/ClientsListPlainPage";
import { EditClientPlainPage } from "@/modules/clients/pages/EditClientsPlainPage";
import { FunctionsListPage } from "@/modules/functions/pages/FunctionsListPage";
import { KnowledgeBaseListPage } from "@/modules/knowledge-base/pages/KnowledgeBaseListPage";
import { KnowledgeBasePage } from "@/modules/knowledge-base/pages/KnowledgeBasePage";
import { KnowledgeOriginListPage } from "@/modules/knowledge-base/pages/KnowledgeOriginListPage";
import { ClientLandingPage } from "@/modules/landing/pages/ClientLandingPage";
import { ProjectsListPage } from "@/modules/projects/pages/ProjectsListPage";
import { SettingsPage } from "@/modules/settings/pages/SettingsPage";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { observer } from "mobx-react";
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
    element: <ClientLandingPage />,
    path: "/landing/:projectId/:clientId",
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
        element: <ClientsListPage />,
        path: "/clients",
      },
      {
        element: <KnowledgeBasePage />,
        path: "/kb/:kbId",
      },
      {
        element: <KnowledgeOriginListPage />,
        path: "/kb/:kbId/origins",
      },
    ],
    element: <ProtectedRoute />,
    path: "/",
  },
  {
    children: [
      {
        element: <ClientsListPlainPage />,
        path: "/crm/clients",
      },
      {
        element: <AddClientPlainPage />,
        path: "/crm/clients/add",
      },
      {
        element: <EditClientPlainPage />,
        path: "/crm/clients/:clientId",
      },
    ],
    element: <PlainProtectedRoute />,
    path: "/crm",
  },
  {
    element: <SignInPage target={"crm"} />,
    path: "/crm/sign-in",
  },
]);

const theme = createTheme({
  primaryColor: "green",
});

function App() {
  return (
    <StoreContext.Provider value={store}>
      <AppContent />
    </StoreContext.Provider>
  );
}

const AppContentView = () => {
  const { config } = useMobXStore();
  useSocket();
  return (
    <MantineProvider
      forceColorScheme={config.useDarkMode === true ? "dark" : "light"}
      theme={theme}
    >
      <ModalsProvider>
        <Notifications />
        <RouterProvider router={router} />
      </ModalsProvider>
    </MantineProvider>
  );
};

const AppContent = observer(AppContentView);

export default App;
