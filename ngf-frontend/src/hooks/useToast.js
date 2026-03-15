/**
 * hooks/useToast.js
 * Hook global para lanzar notificaciones Toast desde cualquier módulo.
 *
 * Uso:
 *   const toast = useToast();
 *   toast.success('Sesión guardada');
 *   toast.error('Error al conectar');
 *   toast.info('Actualizando datos...');
 *   toast.warning('Revisa el formulario');
 */

import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');

  const { addToast } = ctx;

  return {
    success: (message, duration) => addToast({ type: 'success', message, duration }),
    error:   (message, duration) => addToast({ type: 'error',   message, duration }),
    info:    (message, duration) => addToast({ type: 'info',    message, duration }),
    warning: (message, duration) => addToast({ type: 'warning', message, duration }),
  };
}
