import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";

//const Products = await getCategoriesAndDocuments("categories");
const INITIAL_STATE = {
  hidden: true,
  categoriesMap: {},
  cartItems: [],
  cartTotal: 0,
};

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts", // action type
  async () => {
    const Products = await getCategoriesAndDocuments("categories");
    return Products;
  }
);

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
      //update the cart total
      state.cartTotal = state.cartTotal + action.payload.price;
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
      //update the cart total
      state.cartTotal = state.cartTotal - action.payload.price;
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      //update the cart total
      state.cartTotal =
        state.cartTotal - action.payload.price * action.payload.quantity;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      state.categoriesMap = action.payload;
    },
  },
});

export const { toggleCartHidden, addItem, removeItem, clearItemFromCart } =
  cartSlice.actions; // export action

export default cartSlice.reducer; // export the reducer
