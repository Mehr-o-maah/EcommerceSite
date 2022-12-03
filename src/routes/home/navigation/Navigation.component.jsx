import { Outlet, Link } from "react-router-dom";
import cronwnLogo from "../../../assets/crown.svg";
import "./navigation.styles.scss";

import CartIconComponent from "../../../components/cart-icon/cart-icon-component";
import { CartContext } from "../../../contexts/cart.context";
import { useContext } from "react";

import { useSelector } from "react-redux";

import { signOutAuthUser } from "../../../utils/firebase/firebase.utils";
import CartDropdownComponent from "../../../components/cart-dropdown/cart-dropdown.component";

export default function Navigation() {
  const { currentUser } = useSelector((state) => state.user);
  const { hidden } = useContext(CartContext);
  console.log("Current user: ", currentUser?.displayName);

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
          <span style={userNameStyle}>{currentUser?.displayName}</span>
          <CartIconComponent />
        </div>
        {!hidden && <CartDropdownComponent />}
      </div>
      <Outlet />
    </>
  );
}
