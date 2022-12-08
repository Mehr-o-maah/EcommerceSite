import "./cart-icon.styles.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

import { useSelector } from "react-redux";
import { toggleCartHidden } from "../../redux/cart.reducer";
import { useDispatch } from "react-redux";

export default function CartIconComponent() {
  // const { toggleHidden, cartItems } = useContext(CartContext);
  const { cartItems, hidden } = useSelector((state) => state.cart);
  const itemCount = cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  );

  const dispatch = useDispatch();
  const displayCart = () => dispatch(toggleCartHidden());

  console.log(hidden);

  return (
    <div onClick={displayCart} className="cart-icon-container">
      <img src={ShoppingIcon} alt="shoppin icon" className="shooping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
}
