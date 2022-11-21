import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";

export default function ShopComponent() {
  const { products } = useContext(ProductsContext);
  return (
    <>
      {products.map((item) => (
        <div key={item.id}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </>
  );
}
