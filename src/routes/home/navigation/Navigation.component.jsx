import { Outlet, Link } from "react-router-dom";
import cronwnLogo from "../../../assets/crown.svg";
import "./navigation.styles.scss";

import { useContext } from "react";
import { UserContext } from "../../../components/contexts/user.context";
import { signOutAuthUser } from "../../../utils/firebase/firebase.utils";

export default function Navigation() {
  const { currentUser } = useContext(UserContext);
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
        </div>
      </div>
      <Outlet />
    </>
  );
}
