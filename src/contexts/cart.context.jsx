import { createContext, useState, useReducer } from "react";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state, action) => {
  //use object literal
  const actions = {
    TOGGLE_HIDDEN: () => ({
      ...state,
      hidden: !state.hidden,
    }), //this is a function that returns an object

    ADD_ITEM: () => ({
      ...state,
      cartItems: addItemToCart(state.cartItems, action.payload),
    }),

    REMOVE_ITEM: () => ({
      ...state,
      cartItems: removeItemFromCart(state.cartItems, action.payload),
    }),

    CLEAR_ITEM_FROM_CART: () => ({
      ...state,
      cartItems: clearItemFromCart(state.cartItems, action.payload),
    }),

    //default case
    default: () => state, //return the state
  };
  //define the addItemsToCart function
  const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToAdd.id
    );
    if (existingCartItem) {
      return cartItems.map((cartItem) =>
        cartItem.id === cartItemToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
  };

  //define the removeItemFromCart function
  const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if (existingCartItem.quantity === 1) {
      return cartItems.filter(
        (cartItem) => cartItem.id !== cartItemToRemove.id
      );
    }
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };

  //define the clearItemFromCart function
  const clearItemFromCart = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
  };
  //console.log("cartReducer", state);
  //use the actions object to call the function
  return actions[action.type] ? actions[action.type]() : actions.default();
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { hidden, cartItems } = state;

  const toggleHidden = () => dispatch({ type: "TOGGLE_HIDDEN" });
  const addItemToCart = (item) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeItemFromCart = (item) =>
    dispatch({ type: "REMOVE_ITEM", payload: item });
  const clearItemFromCart = (item) =>
    dispatch({ type: "CLEAR_ITEM_FROM_CART", payload: item });

  const value = {
    hidden,
    toggleHidden,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
