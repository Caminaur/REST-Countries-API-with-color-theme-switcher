import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Flag, { loader as flagLoader } from "./components/Flag/Flag.jsx";
import Main, { loader as mainLoader } from "./components/Main/Main.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
        loader: mainLoader,
      },
      {
        path: "flag/:flag",
        element: <Flag />,
        loader: flagLoader,
      },
    ],
  },
]);

const rootDiv = document.getElementById("root");
ReactDOM.createRoot(rootDiv).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  //</React.StrictMode>
);
