import { useAppSelector } from "../redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoutes() {
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/auth/login"} state={{ from: location.pathname }} replace />
  );
}
