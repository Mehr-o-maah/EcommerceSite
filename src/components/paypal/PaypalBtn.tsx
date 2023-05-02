import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface paypalBtnProps {
  amount: string;
  invoiceId: string;
}

const PaypalBtn: React.FC<paypalBtnProps> = ({ amount, invoiceId }) => {
  return (
    <>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                invoice_id: invoiceId,
                amount: {
                  value: amount,
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          });
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order?.capture();
          console.log(order);
        }}
      />
    </>
  );
};

export default PaypalBtn;
