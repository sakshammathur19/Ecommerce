import { useAuth } from "../../Context/auth";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminRoute() {
  const [auth] = useAuth();

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  if (auth?.user?.role !== 1) {
    return <Navigate to="/dashboard/user" />;
  }

  return <Outlet />;
}
