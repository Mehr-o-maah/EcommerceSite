import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

//const Products = await getCategoriesAndDocuments("categories");

const Products = async () => {
  const products = await getCategoriesAndDocuments("categories").then(
    (products) => {
      return products;
    }
  );
  return products;
};

const INITIAL_STATE = {
  hidden: true,
  categoriesMap: {},
  cartItems: [],
};
const setCategoriesMap = async () => {
  const products = await Products();
  INITIAL_STATE.categoriesMap = products;
};
await setCategoriesMap();

// // const products = await Products();
// const INITIAL_STATE = {
//   hidden: true,
//   categoriesMap: Products,
//   cartItems: [],
// };

console.log("INITIAL STATE: ", INITIAL_STATE.categoriesMap);

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    toggleCartHidden: (state) => {
      state.hidden = !state.hidden;
    },
    addItem: (state, action) => {
      //state.cartItems = addItemToCart(state.cartItems, action.payload);
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (existingCartItem) {
        //if the item already exists in the cart, increase the quantity by 1
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 }, //quantity: 1 is the new property
        ];
      }
    },
    removeItem: (state, action) => {
      const existingCartItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (existingCartItem.quantity === 1) {
        //if the quantity is 1, remove the item from the cart
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      } else {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
    },
  },
});

export const { toggleCartHidden, addItem, removeItem, clearItemFromCart } =
  cartSlice.actions; // export action

export default cartSlice.reducer; // export the reducer
