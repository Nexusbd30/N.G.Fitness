/**
 * utils/authStorage.js
 * Gestión centralizada de tokens en localStorage.
 * Importado por el interceptor de http.js y el contexto de Auth.
 */

import { authApi } from '../api/authApi';

const ACCESS_KEY  = 'ngf_access_token';
const REFRESH_KEY = 'ngf_refresh_token';

export const authStorage = {
  // ── Getters ────────────────────────────────────────────────────────────────
  getAccessToken:  () => localStorage.getItem(ACCESS_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),

  // ── Setters ────────────────────────────────────────────────────────────────
  setTokens({ access_token, refresh_token }) {
    localStorage.setItem(ACCESS_KEY,  access_token);
    localStorage.setItem(REFRESH_KEY, refresh_token);
  },

  // ── Limpieza total (logout) ────────────────────────────────────────────────
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },

  // ── Refresh automático (usado por el interceptor de http.js) ───────────────
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const { data } = await authApi.refresh(refreshToken);

    // Guarda el nuevo par de tokens
    this.setTokens(data);

    return data.access_token;
  },
};
