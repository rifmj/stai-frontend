import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";

const router = createBrowserRouter([
  {
    element: <div>Hello world!</div>,
    path: "/",
  },
]);

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
