import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoutes = () => {
  //TODO podria agregar un tab addicional que aparezca luego de logearse, y si el correo no es admin, no aparece la tab
  //TODO puede que necesite crear un isAdmin en el user reducer, y que se haga el dispach desde aqui para luego llamar esa propiedad luego de hacer login y asi hacer un update de las tabs
  const { isAdmin } = useSelector((state) => state.user);

  const isAllowed = isAdmin;
  // console.log("isAllowed:", isAllowed);
  if (!isAllowed) return <Navigate to="/auth" />;
  return <Outlet />;
};
