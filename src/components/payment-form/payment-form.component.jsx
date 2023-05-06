import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cart.reducer";
import { useDispatch } from "react-redux";
import PaypalBtn from "../paypal/PaypalBtn";

export default function PaymentForm() {
  //TODO this paymentForm might not be needed, I could call the store directly from PaypalBtn, and get any data I need from there, passing the cart to PaypalBtn might be the cause of the issue of the cart not being updated
  const currentUser = useSelector((state) => state.user.currentUser);
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  cartItems.map((cartItem) => {
    console.log(cartItem);
  });

  return (
    <>
      <PaypalBtn amount={cartTotal} invoiceId={cartItems} user={currentUser} />
      {/*TODO agregar aqui datos sobre el usuario que realiza la compra*/}
    </>
  );
}
