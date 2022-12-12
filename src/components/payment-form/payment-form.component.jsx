import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import { useSelector } from "react-redux";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser?.displayName || currentUser.email,
          email: currentUser.email,
        },
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment succeeded!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Credit Card Payment: </h2>
      <CardElement />
      <Button buttonType="inverted">Pay</Button>
    </form>
  );
}
