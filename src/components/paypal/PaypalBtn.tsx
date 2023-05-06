import React from "react";
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

    //TODO call backend function to fulfill order
    //! should I get this info here or in the backend? because one solution is to send this info from here to the backend and then send it back to the frontend to display it
    //! 🌟 I think is better to do this from the backend, calling an api to get transaction info and then display it in the frontend using fetch, that way I dont need a database to store payment info

    //if response is success
    setPaidFor(true);
    //refresh user account, display bought items

    //if response is error
    //display error message
    //setError("Your payment was processed successfully. However, there was an error in fulfilling your order. Please contact us at... to resolve this issue.");
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
    //Display cancel message, modal or redirect user to cancel page or back to cart
    console.log(data);
    console.log(actions);
  };

  // // Destructure data using map
  // const { id, imageUrl, name, price, quantity } = invoiceId;
  console.log(
    invoiceId.map(({ id, name, quantity }) => ({ id, name, quantity }))
  );
  const seeItems = () =>
    console.log(
      invoiceId.map(({ id, name, quantity }) => ({ id, name, quantity }))
    );

  return (
    <>
      <PayPalButtons
        onClick={(data, actions) => {
          //validate on button click using the client or server
          console.log("clicked");
          seeItems(); //TODO aqui esta el problema, hay que usar state para que se actualice el array de invoiceId, guarda los datos de invoiceId en un state y luego lo pasas aca y modifica paypal
        }}
        //for example to check that the user has not already bought the item, or that it has not subscribed to the service already
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
                  // description: `Item: ${item.name} \n Quantity: ${item.quantity} \n img: ${item.imageUrl}`,
                  // sku: item.id,
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
      />
    </>
  );
};

export default PaypalBtn;
