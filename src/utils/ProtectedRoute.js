import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({
  redirectTo = "/login",
  children,
}) {
  const { user } = useAuth();
  alert(JSON.stringify(user));
  if (!user) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
}
