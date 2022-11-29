import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
// import SHOP_DATA from "../../shop-data"; // no longer needed, we are using firestore now

//create a react storage context
export const ProductsContext = createContext({
  products: [],
});

//create a react storage provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  //used to send data to firebase, we run it once
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
