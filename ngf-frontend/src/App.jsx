/**
 * App.jsx
 * Router principal de N.G.F.
 * Define todas las rutas públicas y protegidas.
 * Incluye los providers globales: Auth, Toast.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers globales
import { AuthProvider }  from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Componentes globales
import { Layout }         from './components/Layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ToastContainer } from './components/Toast/ToastContainer';

// Páginas — Auth (públicas)
import { LoginPage }    from './modules/auth/pages/LoginPage';
import { RegisterPage } from './modules/auth/pages/RegisterPage';

// Páginas — App (protegidas)
import { DashboardPage } from './modules/dashboard/pages/DashboardPage';
import { SessionsPage }  from './modules/sessions/pages/SessionsPage';
import { AgendaPage }    from './modules/agenda/pages/AgendaPage';
import { CalendarPage }  from './modules/calendar/pages/CalendarPage';
import { ClientsPage }   from './modules/clients/pages/ClientsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>

          {/* Toast se renderiza fuera del layout para estar siempre visible */}
          <ToastContainer />

          <Routes>
            {/* ── Rutas públicas ────────────────────────────────────────── */}
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ── Rutas protegidas (requieren login) ───────────────────── */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/sessions"  element={<SessionsPage />} />
                <Route path="/agenda"    element={<AgendaPage />} />
                <Route path="/calendar"  element={<CalendarPage />} />
                <Route path="/clients"   element={<ClientsPage />} />
              </Route>
            </Route>

            {/* ── Ruta por defecto ─────────────────────────────────────── */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>

        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
