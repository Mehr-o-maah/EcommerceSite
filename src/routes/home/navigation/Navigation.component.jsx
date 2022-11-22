import { Outlet, Link } from "react-router-dom";
import cronwnLogo from "../../../assets/crown.svg";
import "./navigation.styles.scss";

import CartIconComponent from "../../../components/cart-icon/cart-icon-component";
import { useContext } from "react";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { signOutAuthUser } from "../../../utils/firebase/firebase.utils";
import CartDropdownComponent from "../../../components/cart-dropdown/cart-dropdown.component";

export default function Navigation() {
  const { currentUser } = useContext(UserContext);
  const { hidden } = useContext(CartContext);
  console.log("Current user: ", currentUser);

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
          <CartIconComponent />
        </div>
        {!hidden && <CartDropdownComponent />}
      </div>
      <Outlet />
    </>
  );
}
