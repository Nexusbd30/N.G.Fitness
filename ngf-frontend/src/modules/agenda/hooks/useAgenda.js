/**
 * modules/agenda/hooks/useAgenda.js
 * Hook de dominio para gestionar la agenda de citas y eventos.
 *
 * Uso:
 *   const { events, loading, createEvent, cancelEvent } = useAgenda();
 */

import { useState, useEffect, useCallback } from 'react';
import { agendaApi } from '../../../api/agendaApi';
import { useToast } from '../../../hooks/useToast';

export function useAgenda(filters = {}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const toast = useToast();

  // ── Carga de eventos ────────────────────────────────────────────────────────
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await agendaApi.getAll(filters);
      setEvents(data);
    } catch (err) {
      setError(err);
      toast.error('No se pudo cargar la agenda');
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // ── Crear evento ────────────────────────────────────────────────────────────
  const createEvent = async (eventData) => {
    try {
      const { data } = await agendaApi.create(eventData);
      setEvents((prev) => [...prev, data]);
      toast.success('Evento añadido a la agenda');
      return data;
    } catch (err) {
      toast.error('Error al crear el evento');
      throw err;
    }
  };

  // ── Actualizar evento ───────────────────────────────────────────────────────
  const updateEvent = async (id, eventData) => {
    try {
      const { data } = await agendaApi.update(id, eventData);
      setEvents((prev) => prev.map((e) => (e.id === id ? data : e)));
      toast.success('Evento actualizado');
      return data;
    } catch (err) {
      toast.error('Error al actualizar el evento');
      throw err;
    }
  };

  // ── Cancelar evento ─────────────────────────────────────────────────────────
  const cancelEvent = async (id) => {
    try {
      const { data } = await agendaApi.cancel(id);
      setEvents((prev) => prev.map((e) => (e.id === id ? data : e)));
      toast.info('Evento cancelado');
      return data;
    } catch (err) {
      toast.error('Error al cancelar el evento');
      throw err;
    }
  };

  // ── Eliminar evento ─────────────────────────────────────────────────────────
  const deleteEvent = async (id) => {
    try {
      await agendaApi.delete(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success('Evento eliminado');
    } catch (err) {
      toast.error('Error al eliminar el evento');
      throw err;
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    cancelEvent,
    deleteEvent,
  };
}
