/**
 * api/sessionsApi.js
 * Endpoints del módulo de sesiones de entrenamiento.
 */

import http from './http';

export const sessionsApi = {
  /** Lista todas las sesiones (con filtros opcionales) */
  getAll: (params) => http.get('/sessions', { params }),

  /** Obtiene una sesión por ID */
  getById: (id) => http.get(`/sessions/${id}`),

  /** Crea una nueva sesión */
  create: (data) => http.post('/sessions', data),

  /** Actualiza una sesión existente */
  update: (id, data) => http.put(`/sessions/${id}`, data),

  /** Elimina una sesión */
  delete: (id) => http.delete(`/sessions/${id}`),

  /** Finaliza/cierra una sesión activa */
  complete: (id) => http.patch(`/sessions/${id}/complete`),
};
