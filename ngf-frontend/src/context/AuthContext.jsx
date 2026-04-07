import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login as loginRequest, logout as logoutRequest, register as registerRequest } from "../api/auth";
import { clearTokens, getAccessToken, setTokens } from "../lib/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function login(payload) {
    const response = await loginRequest(payload);
    setTokens(response);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }

  async function register(payload) {
    const response = await registerRequest(payload);
    setTokens(response);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    return currentUser;
  }

  async function logout() {
    try {
      await logoutRequest();
    } catch {
      // Ignore logout transport errors and clear local session anyway.
    } finally {
      clearTokens();
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
