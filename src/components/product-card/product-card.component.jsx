import "./product-card.styles.scss";
import { Button } from "../button/button.component";

//Using Redux
//import { useSelector } from "react-redux";
import { addItem } from "../../redux/cart.reducer";
import { useDispatch } from "react-redux";

export default function ProductCardComponent({ product }) {
  const { name, price, imageUrl } = product;
  ////console.log("product from product card:", product);
  const dispatch = useDispatch(); // dispatch action
  const addItemToCart = () => dispatch(addItem(product));

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addItemToCart} buttonType="inverted">
        Add to card
      </Button>
    </div>
  );
}
