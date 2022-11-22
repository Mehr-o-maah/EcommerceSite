import "./cart-icon.styles.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

export default function CartIconComponent() {
  const { toggleHidden } = useContext(CartContext);

  return (
    <div onClick={toggleHidden} className="cart-icon-container">
      <img src={ShoppingIcon} alt="shoppin icon" className="shooping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}
