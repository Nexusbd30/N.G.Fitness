/**
 * api/authApi.js
 * Endpoints del módulo de autenticación.
 */

import http from './http';

export const authApi = {
  /** Inicia sesión y devuelve access + refresh token */
  login: (credentials) => http.post('/auth/login', credentials),

  /** Registra un nuevo usuario */
  register: (data) => http.post('/auth/register', data),

  /** Renueva el access token usando el refresh token */
  refresh: (refreshToken) =>
    http.post('/auth/refresh', { refresh_token: refreshToken }),

  /** Cierra sesión invalidando el refresh token en el servidor */
  logout: () => http.post('/auth/logout'),

  /** Devuelve el perfil del usuario autenticado */
  me: () => http.get('/auth/me'),
};
