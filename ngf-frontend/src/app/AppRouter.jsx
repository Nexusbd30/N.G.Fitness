import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "../components/AppShell";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import AthleteDashboard from "../pages/athlete/AthleteDashboard";
import CalendarPage from "../pages/athlete/CalendarPage";
import GoalsPage from "../pages/athlete/GoalsPage";
import ProfilePage from "../pages/athlete/ProfilePage";
import RoutinesPage from "../pages/athlete/RoutinesPage";
import SessionsPage from "../pages/athlete/SessionsPage";
import LandingPage from "../pages/auth/LandingPage";
import CoachDashboard from "../pages/coach/CoachDashboard";
import SettingsPage from "../pages/settings/SettingsPage";
import NGFFitnessDashboard from "../pages/general/NGFFitnessDashboard";

function HomeRedirect() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="page">
        <div className="empty">Cargando aplicación...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <Navigate replace to="/ngf-dashboard" />;
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<HomeRedirect />} path="/" />
      <Route element={<LandingPage />} path="/login" />
      <Route element={<LandingPage />} path="/register" />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route
          element={
            <ProtectedRoute role="athlete">
              <AthleteDashboard />
            </ProtectedRoute>
          }
          path="/athlete"
        />
        <Route element={<NGFFitnessDashboard />} path="/ngf-dashboard" />
        <Route
          element={
            <ProtectedRoute role="athlete">
              <ProfilePage />
            </ProtectedRoute>
          }
          path="/athlete/profile"
        />
        <Route
          element={
            <ProtectedRoute role="athlete">
              <GoalsPage />
            </ProtectedRoute>
          }
          path="/athlete/goals"
        />
        <Route
          element={
            <ProtectedRoute role="athlete">
              <RoutinesPage />
            </ProtectedRoute>
          }
          path="/athlete/routines"
        />
        <Route
          element={
            <ProtectedRoute role="athlete">
              <SessionsPage />
            </ProtectedRoute>
          }
          path="/athlete/sessions"
        />
        <Route
          element={
            <ProtectedRoute role="coach">
              <CoachDashboard />
            </ProtectedRoute>
          }
          path="/coach"
        />
        <Route element={<CalendarPage />} path="/calendar" />
        <Route element={<SettingsPage />} path="/settings" />
      </Route>

      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}

export default AppRouter;
