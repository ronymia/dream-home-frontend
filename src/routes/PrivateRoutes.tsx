import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function PrivateRoutes() {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location.pathname }} replace />
  );
}
