import { useParams } from "react-router-dom";

import ProductCardComponent from "../../components/product-card/product-card.component";
import "./category.styles.scss";

//using redux
import { useSelector } from "react-redux";

export default function CategoryComponent() {
  const { categoryId } = useParams();
  const { categoriesMap } = useSelector((state) => state.cart);
  ////console.log("cart items:", categoriesMap);

  return (
    <div className="category">
      <h1>{categoryId}</h1>
      <div className="category-container-B">
        {categoriesMap[categoryId]?.map((product) => (
          <ProductCardComponent key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
