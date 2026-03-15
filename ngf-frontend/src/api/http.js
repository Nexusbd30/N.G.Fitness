/**
 * api/http.js
 * Cliente HTTP centralizado con interceptor de refresh token.
 * Todas las llamadas a la API deben usar esta instancia de axios.
 */

import axios from 'axios';
import { authStorage } from '../utils/authStorage';

// ─── Instancia base ────────────────────────────────────────────────────────────
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── Interceptor de Request ────────────────────────────────────────────────────
// Añade el access token en cada petición automáticamente
http.interceptors.request.use(
  (config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Interceptor de Response ───────────────────────────────────────────────────
// Si recibe 401, intenta renovar el access token con el refresh token
// Si falla la renovación, cierra sesión automáticamente
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const newToken = await authStorage.refreshToken();
        original.headers['Authorization'] = `Bearer ${newToken}`;
        return http(original); // reintenta la petición original
      } catch (refreshError) {
        // El refresh también falló → logout forzado
        authStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
