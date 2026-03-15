/**
 * modules/sessions/hooks/useSessions.js
 * Hook de dominio para gestionar sesiones de entrenamiento.
 * Encapsula llamadas a la API, estado de carga y errores.
 *
 * Uso:
 *   const { sessions, loading, createSession, deleteSession } = useSessions();
 */

import { useState, useEffect, useCallback } from 'react';
import { sessionsApi } from '../../../api/sessionsApi';
import { useToast } from '../../../hooks/useToast';

export function useSessions(filters = {}) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const toast = useToast();

  // ── Carga inicial ───────────────────────────────────────────────────────────
  const fetchSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await sessionsApi.getAll(filters);
      setSessions(data);
    } catch (err) {
      setError(err);
      toast.error('No se pudieron cargar las sesiones');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // ── Crear sesión ────────────────────────────────────────────────────────────
  const createSession = async (sessionData) => {
    try {
      const { data } = await sessionsApi.create(sessionData);
      setSessions((prev) => [...prev, data]);
      toast.success('Sesión creada correctamente');
      return data;
    } catch (err) {
      toast.error('Error al crear la sesión');
      throw err;
    }
  };

  // ── Actualizar sesión ───────────────────────────────────────────────────────
  const updateSession = async (id, sessionData) => {
    try {
      const { data } = await sessionsApi.update(id, sessionData);
      setSessions((prev) => prev.map((s) => (s.id === id ? data : s)));
      toast.success('Sesión actualizada');
      return data;
    } catch (err) {
      toast.error('Error al actualizar la sesión');
      throw err;
    }
  };

  // ── Eliminar sesión ─────────────────────────────────────────────────────────
  const deleteSession = async (id) => {
    try {
      await sessionsApi.delete(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
      toast.success('Sesión eliminada');
    } catch (err) {
      toast.error('Error al eliminar la sesión');
      throw err;
    }
  };

  // ── Completar sesión ────────────────────────────────────────────────────────
  const completeSession = async (id) => {
    try {
      const { data } = await sessionsApi.complete(id);
      setSessions((prev) => prev.map((s) => (s.id === id ? data : s)));
      toast.success('Sesión completada ✓');
      return data;
    } catch (err) {
      toast.error('Error al completar la sesión');
      throw err;
    }
  };

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    createSession,
    updateSession,
    deleteSession,
    completeSession,
  };
}
