import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Components
import Home from "./routes/home/Home.component";
import NavigationBar from "./routes/home/navigation/Navigation.component";
import Auth from "./routes/auth/Authentication.component";
import ShopComponent from "./routes/shop/shop.component";

//Contexts
import { UserProvider } from "./contexts/user.context";
import { ProductsProvider } from "./contexts/products.context";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      { path: "shop", element: <ShopComponent /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </UserProvider>
  </React.StrictMode>
);
