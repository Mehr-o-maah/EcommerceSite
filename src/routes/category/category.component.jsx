import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCardComponent from "../../components/product-card/product-card.component";
import "./category.styles.scss";

export default function CategoryComponent() {
  const { categoryId } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

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
