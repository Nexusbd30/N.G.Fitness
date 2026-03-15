/**
 * components/Layout/Layout.jsx
 * Contenedor principal de la app.
 * Incluye Navbar + área de contenido.
 * Todas las rutas protegidas renderizan dentro de este Layout.
 */

import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      {/* Barra de navegación global */}
      <Navbar />

      {/* Contenido de la ruta activa */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}
