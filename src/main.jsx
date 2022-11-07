import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Components
import Home from "./routes/home/Home.component";
import NavigationBar from "./routes/home/Navigation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      { index: true, element: <Home /> },
      /* ... */
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
