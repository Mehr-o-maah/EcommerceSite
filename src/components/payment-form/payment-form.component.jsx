import { CardElement } from "@stripe/react-stripe-js";
import Button from "../button/button.component";

export default function PaymentForm() {
  return (
    <form>
      <CardElement />
      <Button buttonType="inverted">Pay</Button>
    </form>
  );
}
