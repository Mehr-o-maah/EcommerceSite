import { useSelector } from "react-redux";
import PaypalBtn from "../paypal/PaypalBtn";

export default function PaymentForm() {
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <>
      <PaypalBtn amount={cartTotal} invoiceId={cartItems} user={currentUser} />
    </>
  );
}
