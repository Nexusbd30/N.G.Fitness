/**
 * components/Navbar/Navbar.jsx
 * Barra de navegación principal de N.G.F.
 * Muestra links de módulos y el botón de logout.
 */

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { to: '/dashboard',  label: 'Dashboard' },
  { to: '/sessions',   label: 'Sesiones'  },
  { to: '/agenda',     label: 'Agenda'    },
  { to: '/calendar',   label: 'Calendario'},
  { to: '/clients',    label: 'Clientes'  },
];

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <nav className="container mx-auto px-4 max-w-7xl h-16 flex items-center justify-between">

        {/* Logo / Marca */}
        <NavLink
          to="/dashboard"
          className="text-xl font-bold text-white tracking-tight"
        >
          N<span className="text-emerald-400">.</span>G
          <span className="text-emerald-400">.</span>F
        </NavLink>

        {/* Links de módulos */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Usuario + Logout */}
        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden sm:block text-sm text-gray-400">
              {user.name || user.email}
            </span>
          )}
          <button
            onClick={logout}
            className="text-sm px-3 py-1.5 rounded-md bg-gray-800 text-gray-300
                       hover:bg-red-600 hover:text-white transition-colors"
          >
            Salir
          </button>
        </div>
      </nav>
    </header>
  );
}
