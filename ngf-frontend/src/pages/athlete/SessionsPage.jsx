import { useEffect, useState } from "react";
import { createSession, getRoutines, getSessions } from "../../api/trainer";

const initialForm = {
  routine_id: "",
  event_id: "manual-session",
  date: "",
  notes: "",
};

export default function SessionsPage() {
  const [sessions, setSessions] = useState([]);
  const [routines, setRoutines] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadData() {
    try {
      const [sessionsResponse, routinesResponse] = await Promise.all([getSessions(), getRoutines()]);
      setSessions(sessionsResponse);
      setRoutines(routinesResponse);
    } catch {
      setError("No se pudieron cargar las sesiones.");
    }
  }

  useEffect(() => {
    loadData();
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
      await createSession({
        ...form,
        date: new Date(form.date).toISOString(),
      });
      setForm(initialForm);
      await loadData();
    } catch {
      setError("No se pudo registrar la sesión.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Sesiones</h1>
        <p className="muted">Registro rápido y listado de sesiones ejecutadas.</p>
      </div>

      {error ? <div className="card padded">{error}</div> : null}

      <div className="grid grid-2">
        <form className="card padded list" onSubmit={handleSubmit}>
          <div className="section-title">Nueva sesión</div>
          <select className="select" name="routine_id" onChange={updateField} value={form.routine_id}>
            <option value="">Selecciona una rutina</option>
            {routines.map((routine) => (
              <option key={routine.id} value={routine.id}>
                {routine.name}
              </option>
            ))}
          </select>
          <input className="field" name="date" onChange={updateField} type="datetime-local" value={form.date} />
          <textarea className="textarea" name="notes" onChange={updateField} placeholder="Notas" value={form.notes} />
          <button className="btn btn-primary" disabled={submitting || !form.routine_id || !form.date} type="submit">
            {submitting ? "Guardando..." : "Guardar sesión"}
          </button>
        </form>

        <div className="card padded">
          <div className="section-title">Historial</div>
          <div className="list">
            {sessions.length ? (
              sessions.map((session) => (
                <div key={session.id} className="list-item">
                  <strong>{new Date(session.date).toLocaleString()}</strong>
                  <div className="muted">{session.notes || "Sin notas"}</div>
                </div>
              ))
            ) : (
              <div className="empty">No hay sesiones registradas.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
