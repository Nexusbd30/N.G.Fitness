/**
 * modules/dashboard/pages/DashboardPage.jsx
 * Vista principal del panel de control.
 * Muestra resumen de sesiones, próximos eventos y accesos rápidos.
 */

import { useAuth } from '../../../context/AuthContext';

export function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Hola, {user?.name || 'Entrenador'} 👋
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Panel de control — N.G.F Next Generation Fitness
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Sesiones hoy',     value: '—', color: 'text-emerald-400' },
          { label: 'Clientes activos', value: '—', color: 'text-blue-400'    },
          { label: 'Citas esta semana',value: '—', color: 'text-purple-400'  },
          { label: 'Pendientes',       value: '—', color: 'text-yellow-400'  },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5"
          >
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder de actividad reciente */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Actividad reciente</h3>
        <p className="text-gray-500 text-sm">
          Aquí se mostrarán las últimas sesiones y eventos. Conecta los módulos para ver datos reales.
        </p>
      </div>
    </div>
  );
}
