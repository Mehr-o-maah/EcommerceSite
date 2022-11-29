import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCardComponent from "../../components/product-card/product-card.component";
import "./shop.style.scss";

export default function ShopComponent() {
  const { categoriesMap } = useContext(CategoriesContext);
  //TODO use cashing with swr or react-query to cache the data
  console.log(categoriesMap);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => (
        <div key={title}>
          <h2>{title}</h2>
          <div className="products-container">
            {categoriesMap[title].map((product) => (
              <ProductCardComponent key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
