import { useEffect, useState } from "react";
import { createEvent, getEvents, rescheduleEvent, updateEventStatus } from "../../api/agenda";

const initialForm = {
  type: "",
  title: "",
  start_at: "",
  end_at: "",
};

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadEvents() {
    try {
      const response = await getEvents();
      setEvents(response);
    } catch {
      setError("No se pudo cargar el calendario.");
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleCreate(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createEvent({
        ...form,
        start_at: new Date(form.start_at).toISOString(),
        end_at: new Date(form.end_at).toISOString(),
      });
      setForm(initialForm);
      await loadEvents();
    } catch {
      setError("No se pudo crear el evento.");
    } finally {
      setSubmitting(false);
    }
  }

  async function markStatus(eventId, status) {
    try {
      await updateEventStatus(eventId, { status });
      await loadEvents();
    } catch {
      setError("No se pudo actualizar el estado.");
    }
  }

  async function postponeOneHour(item) {
    try {
      const start = new Date(item.start_at);
      const end = new Date(item.end_at);
      start.setHours(start.getHours() + 1);
      end.setHours(end.getHours() + 1);
      await rescheduleEvent(item.id, {
        start_at: start.toISOString(),
        end_at: end.toISOString(),
        reason: "postponed_from_ui",
      });
      await loadEvents();
    } catch {
      setError("No se pudo reprogramar el evento.");
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Calendario</h1>
        <p className="muted">Gestión simple de eventos, estado y reprogramación.</p>
      </div>

      {error ? <div className="card padded">{error}</div> : null}

      <div className="grid grid-2">
        <form className="card padded list" onSubmit={handleCreate}>
          <div className="section-title">Nuevo evento</div>
          <input className="field" name="title" onChange={updateField} placeholder="Título" value={form.title} />
          <input className="field" name="type" onChange={updateField} placeholder="Tipo" value={form.type} />
          <input className="field" name="start_at" onChange={updateField} type="datetime-local" value={form.start_at} />
          <input className="field" name="end_at" onChange={updateField} type="datetime-local" value={form.end_at} />
          <button className="btn btn-primary" disabled={submitting} type="submit">
            {submitting ? "Guardando..." : "Guardar evento"}
          </button>
        </form>

        <div className="card padded">
          <div className="section-title">Eventos</div>
          <div className="list">
            {events.length ? (
              events.map((item) => (
                <div key={item.id} className="list-item">
                  <div className="split">
                    <div>
                      <strong>{item.title}</strong>
                      <div className="muted">
                        {item.type} · {new Date(item.start_at).toLocaleString()}
                      </div>
                    </div>
                    <span className="pill">{item.status}</span>
                  </div>
                  <div className="actions-row">
                    <button className="btn btn-secondary" onClick={() => postponeOneHour(item)} type="button">
                      +1 hora
                    </button>
                    <button className="btn btn-secondary" onClick={() => markStatus(item.id, "completed")} type="button">
                      Completar
                    </button>
                    <button className="btn btn-danger" onClick={() => markStatus(item.id, "cancelled")} type="button">
                      Cancelar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty">No hay eventos registrados.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
