import { loadStripe } from "@stripe/stripe-js";

////console.log(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);
//const key = `${apiKey}:${import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY}`;
export const stripePromise = loadStripe(
  import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY
);
