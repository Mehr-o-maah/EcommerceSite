const stripe = import.meta.env.VITE_STRIPE_SECRET_KEY;

export async function post(req, res) {
  // Create a PaymentIntent with the order amount and currency
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.end(JSON.stringify({ clientSecret: paymentIntent.client_secret }));
}
