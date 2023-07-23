import React, { useEffect } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface paypalBtnProps {
  amount: string;
  invoiceId: invoiceId[]; // change to an array of invoiceId objects
}

type invoiceId = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: string;
};

const PaypalBtn: React.FC<paypalBtnProps> = ({ amount, invoiceId }) => {
  const [paidFor, setPaidFor] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleApprove = async (data: any, actions: any) => {
    const order = await actions.order?.capture();
    console.log(order);

    // TODO: Call backend function to fulfill order using currentInvoiceId

    setPaidFor(true);
  };

  const handleError = (err: any) => {
    console.log(err);
    setError(err);
  };

  if (paidFor) {
    alert("Your payment was processed successfully.");
  }
  if (error) {
    alert("There was an error in processing your payment. Please try again.");
  }

  const handleCancel = (data: any, actions: any) => {
    console.log(data);
    console.log(actions);
  };

  const seeItems = () =>
    console.log(
      invoiceId.map(({ id, name, quantity }) => ({ id, name, quantity }))
    );

  return (
    <>
      <PayPalButtons
        onClick={(data, actions) => {
          console.log("clicked");
          seeItems();
        }}
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: amount,
                    },
                  },
                },
                items: invoiceId.map((item) => ({
                  name: item.name,
                  unit_amount: {
                    currency_code: "USD",
                    value: item.price.toFixed(2),
                  },
                  quantity: item.quantity,
                })),
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          });
        }}
        onApprove={handleApprove}
        onError={handleError}
        onCancel={handleCancel}
        forceReRender={invoiceId}
      />
    </>
  );
};

export default PaypalBtn;
