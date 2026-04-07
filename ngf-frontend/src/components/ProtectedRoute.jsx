import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="page">
        <div className="empty">Cargando sesión...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/" />;
  }

  if (role && user?.role !== role) {
    return <Navigate replace to={user?.role === "coach" ? "/coach" : "/athlete"} />;
  }

  return children;
}
