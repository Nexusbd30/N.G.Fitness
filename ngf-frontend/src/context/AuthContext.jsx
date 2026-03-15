/**
 * context/AuthContext.jsx
 * Contexto global de autenticación.
 * Expone el usuario actual, estado de carga, login y logout.
 */

import { createContext, useState, useEffect, useContext } from 'react';
import { authApi } from '../api/authApi';
import { authStorage } from '../utils/authStorage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true hasta verificar sesión

  // ── Al montar: verificar si ya hay sesión activa ──────────────────────────
  useEffect(() => {
    const token = authStorage.getAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    authApi.me()
      .then(({ data }) => setUser(data))
      .catch(() => authStorage.clear())  // token inválido → limpiar
      .finally(() => setLoading(false));
  }, []);

  /** Inicia sesión y guarda tokens */
  const login = async (credentials) => {
    const { data } = await authApi.login(credentials);
    authStorage.setTokens(data);
    setUser(data.user);
    return data;
  };

  /** Cierra sesión y limpia estado */
  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Si falla, cerramos igualmente en el cliente
    } finally {
      authStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Hook de conveniencia: useAuth() */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return ctx;
}
