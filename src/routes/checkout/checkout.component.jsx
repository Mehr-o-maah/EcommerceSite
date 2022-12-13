import "./checkout.styles.scss";
// //import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

import CheckoutItemComponent from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

//Using Redux
import { useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "../../redux/cart.reducer";
import { useDispatch } from "react-redux";

export default function CheckoutComponent() {
  const { cartItems } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch(); // dispatch action
  //console.log("cart items:", cartItems);

  const addItemToCart = (item) => dispatch(addItem(item));
  const removeItemFromCart = (item) => dispatch(removeItem(item));
  const clearItem = (item) => dispatch(clearItemFromCart(item));

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
      {
        //using context
        // cartItems.map((cartItem) => (
        //   <CheckoutItemComponent
        //     key={cartItem.id}
        //     cartItem={cartItem}
        //     addItemToCart={() => addItemToCart(cartItem)}
        //     removeItemFromCart={() => removeItemFromCart(cartItem)}
        //     clearItemFromCart={() => clearItemFromCart(cartItem)}
        //   />

        // ))

        //using redux
        cartItems.map((cartItem) => (
          <CheckoutItemComponent
            key={cartItem.id}
            cartItem={cartItem}
            addItemToCart={() => addItemToCart(cartItem)}
            removeItemFromCart={() => removeItemFromCart(cartItem)}
            clearItemFromCart={() => clearItem(cartItem)}
          />
        ))
      }
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
        <PaymentForm />
      </div>
      <button onClick={handleCheckout} className="button">
        CHECKOUT
      </button>
    </div>
  );
}
