import "./cart-item.styles.scss";

export default function CartItemComponent({ cartItem }) {
  const { imageUrl, price, name, quantity } = cartItem;
  ////console.log("cartItem from cart item:", cartItem);
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price * quantity}
        </span>
      </div>
    </div>
  );
}
