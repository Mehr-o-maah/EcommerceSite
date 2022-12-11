import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export default function FetchProducts() {
  return async (dispatch) => {
    const products = await getCategoriesAndDocuments("categories");
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: products,
    });
  };
}
