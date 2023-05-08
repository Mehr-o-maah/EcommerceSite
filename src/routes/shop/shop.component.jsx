import { Routes, Route } from "react-router-dom";
import "./shop.style.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import CategoryComponent from "../category/category.component";

import { ProductsContext } from "../../contexts/product.context";

export default function ShopComponent() {
  //TODO use cashing with swr or react-query to cache the data
  return (
    <Routes>
      <Route path="/" element={<CategoriesPreview />} />
      <Route path=":categoryId" element={<CategoryComponent />} />
    </Routes>
  );
}
