/**
 * api/agendaApi.js
 * Endpoints del módulo de agenda y programación.
 */

import http from './http';

export const agendaApi = {
  /** Lista todas las citas/eventos de la agenda */
  getAll: (params) => http.get('/agenda', { params }),

  /** Obtiene un evento por ID */
  getById: (id) => http.get(`/agenda/${id}`),

  /** Crea un nuevo evento en la agenda */
  create: (data) => http.post('/agenda', data),

  /** Actualiza un evento */
  update: (id, data) => http.put(`/agenda/${id}`, data),

  /** Cancela un evento */
  cancel: (id) => http.patch(`/agenda/${id}/cancel`),

  /** Elimina un evento */
  delete: (id) => http.delete(`/agenda/${id}`),
};
