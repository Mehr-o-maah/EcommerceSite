import { Outlet, Link } from "react-router-dom";
import cronwnLogo from "../../../assets/crown.svg";
import "./navigation.styles.scss";

import CartIconComponent from "../../../components/cart-icon/cart-icon-component";

import { useSelector } from "react-redux";
import { toggleCartHidden } from "../../../redux/cart.reducer";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../redux/cart.reducer";

import { signOutAuthUser } from "../../../utils/firebase/firebase.utils";
import CartDropdownComponent from "../../../components/cart-dropdown/cart-dropdown.component";
import { useEffect } from "react";

export default function Navigation() {
  const { currentUser, hidden } = useSelector((state) => state.cart);
  console.log(
    "Current user from Navigation component: ",
    currentUser,
    "Hidden: ",
    hidden
  );

  const dispatch = useDispatch();
  //const toggleCart = () => dispatch(toggleCartHidden());

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const userNameStyle = {
    fontSize: "1.2rem",
    textTransform: "capitalize",
    marginRight: "1rem",
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={cronwnLogo} alt="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutAuthUser}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <span style={userNameStyle}>{currentUser}</span>
          <CartIconComponent />
        </div>
        {!hidden && <CartDropdownComponent />}
      </div>
      <Outlet />
    </>
  );
}
