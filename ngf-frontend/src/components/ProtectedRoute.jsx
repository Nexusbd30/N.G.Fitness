/**
 * components/ProtectedRoute.jsx
 * Guarda de ruta: redirige al login si el usuario no está autenticado.
 *
 * Uso en el router:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *   </Route>
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  // Mientras verifica la sesión muestra pantalla de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-400 animate-pulse">Verificando sesión...</p>
      </div>
    );
  }

  // Si no hay usuario → redirige al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Usuario autenticado → renderiza la ruta hija
  return <Outlet />;
}
