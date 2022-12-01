import "./category-preview.styles.scss";
import ProductCardComponent from "../product-card/product-card.component";
import { Link } from "react-router-dom";

export default function CategoryPreviewComponent({ title, items }) {
  //TODO the link should also be on the home page
  return (
    <div className="category-preview-container">
      <h1 className="title">
        <Link to={`/shop/${title.toLowerCase()}`}>{title}</Link>
      </h1>
      <div className="preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <ProductCardComponent key={item.id} product={item} />
          ))}
      </div>
    </div>
  );
}
