import "./category-item.styles.scss";
import { Link } from "react-router-dom";

export default function Category({ category }) {
  const { imageUrl, title } = category;
  return (
    <Link className="category-container" to={`shop/${title}`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </Link>
  );
}
