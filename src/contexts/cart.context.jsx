import { createContext, useState } from "react";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
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

  const removeItemFromCart = (item) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingCartItem.quantity === 1) {
      // if the quantity is 1, remove the item from the cart
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
      // if the quantity is more than 1, decrease the quantity by 1
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  const clearItemFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const value = {
    hidden,
    toggleHidden: () => setHidden(!hidden),
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
