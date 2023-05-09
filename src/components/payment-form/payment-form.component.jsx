import { useSelector } from "react-redux";
import PaypalBtn from "../paypal/PaypalBtn";

export default function PaymentForm() {
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  return (
    <>
      <PaypalBtn amount={cartTotal} invoiceId={cartItems} user={currentUser} />
    </>
  );
}
