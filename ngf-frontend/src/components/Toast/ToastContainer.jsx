/**
 * components/Toast/ToastContainer.jsx
 * Contenedor visual de notificaciones Toast.
 * Debe colocarse UNA SOLA VEZ en App.jsx, fuera del <main>.
 *
 * Estilos: Tailwind CSS
 */

import { useContext } from 'react';
import { ToastContext } from '../../context/ToastContext';

// Mapa de estilos por tipo de toast
const STYLES = {
  success: 'bg-green-600  text-white',
  error:   'bg-red-600    text-white',
  info:    'bg-blue-600   text-white',
  warning: 'bg-yellow-500 text-gray-900',
};

// Íconos simples por tipo
const ICONS = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
};

export function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext);

  if (!toasts.length) return null;

  return (
    // Posición fija — esquina superior derecha
    <div
      aria-live="polite"
      className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={`
            flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg
            animate-fade-in transition-all
            ${STYLES[toast.type] || STYLES.info}
          `}
        >
          {/* Ícono */}
          <span className="text-lg font-bold shrink-0">
            {ICONS[toast.type]}
          </span>

          {/* Mensaje */}
          <p className="flex-1 text-sm leading-snug">{toast.message}</p>

          {/* Botón cerrar */}
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none"
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
