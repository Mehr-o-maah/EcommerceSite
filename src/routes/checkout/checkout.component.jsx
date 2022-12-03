import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

import CheckoutItemComponent from "../../components/checkout-item/checkout-item.component";

export default function CheckoutComponent() {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (currentUser) {
      navigate("/checkout");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItemComponent
          key={cartItem.id}
          cartItem={cartItem}
          addItemToCart={() => addItemToCart(cartItem)}
          removeItemFromCart={() => removeItemFromCart(cartItem)}
          clearItemFromCart={() => clearItemFromCart(cartItem)}
        />
      ))}
      <div className="total">
        <span>
          TOTAL: $
          {cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
              accumulatedQuantity + cartItem.quantity * cartItem.price,
            0
          )}
        </span>
      </div>
      <div className="test-warning">
        *Please use the following test credit card for payments*
        <br />
        4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
      </div>
      <button onClick={handleCheckout} className="button">
        CHECKOUT
      </button>
    </div>
  );
}
