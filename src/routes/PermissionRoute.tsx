import React from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate, Outlet } from "react-router-dom";

interface PermissionRouteProps {
  requiredPermissions: string[];
}

export default function PermissionRoute({
  requiredPermissions,
}: PermissionRouteProps) {
  const { isAuthenticated, userPermissions } = useAppSelector(
    (state) => state.auth
  );

  const hasPermission = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  if (!isAuthenticated) return <Navigate to={"/auth/login"} />;

  return hasPermission ? <Outlet /> : <Navigate to={"/not-authorized"} />;
}
