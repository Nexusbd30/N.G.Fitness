/**
 * context/ToastContext.jsx
 * Contexto global que provee el sistema de notificaciones Toast.
 * Envuelve toda la app en App.jsx para que cualquier módulo pueda usarlo.
 */

import { createContext, useState, useCallback, useId } from 'react';

export const ToastContext = createContext(null);

/**
 * ToastProvider
 * Mantiene el estado de los toasts activos y expone addToast.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  /**
   * Añade un nuevo toast.
   * @param {{ type: 'success'|'error'|'info'|'warning', message: string, duration?: number }} toast
   */
  const addToast = useCallback(({ type, message, duration = 4000 }) => {
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((prev) => [...prev, { id, type, message }]);

    // Auto-remove después del duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  /** Elimina un toast manualmente (ej: al hacer click en ×) */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
