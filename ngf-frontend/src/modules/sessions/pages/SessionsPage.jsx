/**
 * modules/sessions/pages/SessionsPage.jsx
 * Página principal del módulo de sesiones.
 * Lista sesiones y permite crear / completar / eliminar.
 */

import { useSessions } from '../hooks/useSessions';

export function SessionsPage() {
  const {
    sessions,
    loading,
    createSession,
    completeSession,
    deleteSession,
  } = useSessions();

  if (loading) {
    return (
      <p className="text-gray-400 animate-pulse text-center py-20">
        Cargando sesiones...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Sesiones</h2>
        <button
          onClick={() =>
            createSession({
              title:      'Nueva sesión',
              date:       new Date().toISOString(),
              client_id:  null,
              notes:      '',
            })
          }
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white
                     text-sm font-medium rounded-lg transition-colors"
        >
          + Nueva sesión
        </button>
      </div>

      {/* Lista */}
      {sessions.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
          <p className="text-gray-500">No hay sesiones registradas todavía.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4
                         flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-white font-medium">{session.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date(session.date).toLocaleString('es-ES')}
                  {session.status && (
                    <span
                      className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                        session.status === 'completed'
                          ? 'bg-emerald-900 text-emerald-300'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {session.status}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {session.status !== 'completed' && (
                  <button
                    onClick={() => completeSession(session.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-emerald-900
                               text-emerald-300 hover:bg-emerald-700 transition-colors"
                  >
                    Completar
                  </button>
                )}
                <button
                  onClick={() => deleteSession(session.id)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-gray-800
                             text-gray-400 hover:bg-red-900 hover:text-red-300 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
