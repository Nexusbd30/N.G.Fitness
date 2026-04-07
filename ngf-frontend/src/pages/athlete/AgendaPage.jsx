import { useEffect, useState } from "react";
import { createEvent, getEvents } from "../../api/agenda";

const initialForm = {
  tipo: "",
  fecha_inicio: "",
  fecha_fin: "",
  estado: "scheduled",
};

export default function AgendaPage() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadEvents() {
    try {
      const response = await getEvents();
      setEvents(response);
    } catch {
      setError("No se pudo cargar la agenda.");
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createEvent(form);
      setForm(initialForm);
      await loadEvents();
    } catch {
      setError("No se pudo crear el evento.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Agenda</h1>
        <p className="muted">Calendario básico compartido entre perfiles.</p>
      </div>

      {error ? <div className="card">{error}</div> : null}

      <div className="grid grid-2">
        <form className="card list" onSubmit={handleSubmit}>
          <div className="section-title">Nuevo evento</div>
          <input className="field" name="tipo" onChange={updateField} placeholder="Tipo" value={form.tipo} />
          <input className="field" name="fecha_inicio" onChange={updateField} type="datetime-local" value={form.fecha_inicio} />
          <input className="field" name="fecha_fin" onChange={updateField} type="datetime-local" value={form.fecha_fin} />
          <select className="select" name="estado" onChange={updateField} value={form.estado}>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn btn-primary" disabled={submitting} type="submit">
            {submitting ? "Guardando..." : "Guardar evento"}
          </button>
        </form>

        <div className="card">
          <div className="section-title">Eventos</div>
          <div className="list">
            {events.length ? (
              events.map((event) => (
                <div key={event.id} className="list-item">
                  <div>
                    <strong>{event.tipo}</strong>
                    <div className="muted">{event.estado}</div>
                  </div>
                  <span>{event.fecha_inicio || "-"}</span>
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
