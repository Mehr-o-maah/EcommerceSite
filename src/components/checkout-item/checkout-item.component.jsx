import "./checkout-item.styles.scss";

export default function CheckoutItemComponent({
  cartItem,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
}) {
  const { imageUrl, price, name, quantity } = cartItem;
  //console.log("cartItem from cart item:", cartItem);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div onClick={removeItemFromCart} className="arrow">
          &#10094;
        </div>
        {quantity}
        <div onClick={addItemToCart} className="arrow">
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <span onClick={clearItemFromCart} className="remove-button">
        &#10005;
      </span>
    </div>
  );
}
