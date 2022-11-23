import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import CartItemComponent from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

export default function CartDropdownComponent() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((cartItem) => (
          <CartItemComponent key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>
      <Button buttonType="dropDown">GO TO CHECKOUT</Button>
    </div>
  );
}
