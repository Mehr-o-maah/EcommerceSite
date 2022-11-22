import { createContext, useState } from "react";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
});

export const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const value = { hidden, toggleHidden: () => setHidden(!hidden) };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
