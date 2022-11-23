import { createContext, useState } from "react";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    // if item already exists in cart, increase quantity
    if (existingCartItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]); // this happens when we add a new item to the cart
    }
  };

  const value = {
    hidden,
    toggleHidden: () => setHidden(!hidden),
    cartItems,
    addItemToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
