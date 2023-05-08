import React from "react";
import ReactDOM from "react-dom/client";
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
import { CartProvider } from "./contexts/cart.context";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//paypal integration
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

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
      <PayPalScriptProvider
        options={{
          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        }}
      >
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

//TODO hacer las paginas para editar los productos solo para el admin
