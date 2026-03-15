/**
 * modules/agenda/pages/AgendaPage.jsx
 * Página principal del módulo de agenda.
 */

import { useAgenda } from '../hooks/useAgenda';

export function AgendaPage() {
  const { events, loading, createEvent, cancelEvent, deleteEvent } = useAgenda();

  if (loading) {
    return (
      <p className="text-gray-400 animate-pulse text-center py-20">
        Cargando agenda...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabecera */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Agenda</h2>
        <button
          onClick={() =>
            createEvent({
              title:   'Nueva cita',
              date:    new Date().toISOString(),
              client_id: null,
              notes:   '',
            })
          }
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white
                     text-sm font-medium rounded-lg transition-colors"
        >
          + Nueva cita
        </button>
      </div>

      {/* Lista de eventos */}
      {events.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
          <p className="text-gray-500">No hay citas en la agenda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4
                         flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-white font-medium">{event.title}</p>
                <p className="text-sm text-gray-400 mt-0.5">
                  {new Date(event.date).toLocaleString('es-ES')}
                  {event.status === 'cancelled' && (
                    <span className="ml-3 text-xs px-2 py-0.5 rounded-full bg-red-900 text-red-300">
                      Cancelada
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {event.status !== 'cancelled' && (
                  <button
                    onClick={() => cancelEvent(event.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-yellow-900
                               text-yellow-300 hover:bg-yellow-700 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  onClick={() => deleteEvent(event.id)}
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
