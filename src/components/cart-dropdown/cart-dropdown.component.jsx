import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

export default function CartDropdownComponent() {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button className="custom-button">GO TO CHECKOUT</Button>
    </div>
  );
}
