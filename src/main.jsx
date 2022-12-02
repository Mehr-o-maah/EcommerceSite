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
import CheckoutComponent from "./routes/checkout/checkout.component";

//Contexts
//import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";

//redux
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      { path: "shop/*", element: <ShopComponent /> },
      { path: "checkout", element: <CheckoutComponent /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CategoriesProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </CategoriesProvider>
    </Provider>
  </React.StrictMode>
);
