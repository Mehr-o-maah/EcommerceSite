import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
  //poner algo como if not admin, return navigate to login

  return <Outlet />;
};
