import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

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
      <CartProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
        </Elements>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
