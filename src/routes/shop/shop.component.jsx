import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCardComponent from "../../components/product-card/product-card.component";
import "./shop.style.scss";

export default function ShopComponent() {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((item) => (
        <ProductCardComponent key={item.id} product={item} />
      ))}
    </div>
  );
}
