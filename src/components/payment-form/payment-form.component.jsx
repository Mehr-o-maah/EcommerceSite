import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cart.reducer";
import { useDispatch } from "react-redux";
import PaypalBtn from "../paypal/PaypalBtn";

export default function PaymentForm() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  return (
    <>
      <PaypalBtn amount={cartTotal} invoiceId={cartItems} user={currentUser} />
    </>
  );
}
