import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function buildLinks(role) {
  const common = [
    { to: "/calendar", label: "Calendario" },
    { to: "/settings", label: "Settings" },
  ];

  if (role === "coach") {
    return [{ to: "/coach", label: "Panel" }, ...common];
  }

  return [
    { to: "/athlete", label: "Panel Athlete" },
    { to: "/athlete/profile", label: "Perfil" },
    { to: "/athlete/goals", label: "Objetivos" },
    { to: "/athlete/routines", label: "Rutinas" },
    { to: "/athlete/sessions", label: "Sesiones" },
    ...common,
  ];
}

export default function AppShell() {
  const { logout, user } = useAuth();
  const links = buildLinks(user?.role);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            <strong>NGF</strong>
            <div className="muted">{user?.role === "coach" ? "Coach Console" : "Athlete Console"}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {links.map((link) => (
            <NavLink
              key={link.to}
              className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="shell-main">
        <header className="topbar">
          <div>
            <div className="section-title">Next Generation Fitness</div>
            <div className="muted">{user?.email}</div>
          </div>

          <button className="btn btn-secondary" onClick={logout} type="button">
            Cerrar sesión
          </button>
        </header>

        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
