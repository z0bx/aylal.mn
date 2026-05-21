import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <div>Ачаалж байна...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}