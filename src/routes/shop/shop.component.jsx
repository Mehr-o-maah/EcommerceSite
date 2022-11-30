import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreviewComponent from "../../components/category-preview/category-preview.component";
import "./shop.style.scss";

export default function ShopComponent() {
  const { categoriesMap } = useContext(CategoriesContext);
  //TODO use cashing with swr or react-query to cache the data
  console.log(categoriesMap);
  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreviewComponent
          key={title}
          title={title}
          items={categoriesMap[title]}
        />
      ))}
    </div>
  );
}
