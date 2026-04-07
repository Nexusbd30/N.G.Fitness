import { useEffect, useState } from "react";
import { createRoutine, getRoutines } from "../../api/trainer";

const initialForm = {
  name: "",
  description: "",
  level: "beginner",
  days_per_week: 3,
};

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadRoutines() {
    try {
      const response = await getRoutines();
      setRoutines(response);
    } catch {
      setError("No se pudieron cargar las rutinas.");
    }
  }

  useEffect(() => {
    loadRoutines();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "days_per_week" ? Number(value) : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createRoutine(form);
      setForm(initialForm);
      await loadRoutines();
    } catch {
      setError("No se pudo crear la rutina.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Rutinas</h1>
        <p className="muted">Planes creados por el usuario autenticado.</p>
      </div>

      {error ? <div className="card padded">{error}</div> : null}

      <div className="grid grid-2">
        <form className="card padded list" onSubmit={handleSubmit}>
          <div className="section-title">Nueva rutina</div>
          <input className="field" name="name" onChange={updateField} placeholder="Nombre" value={form.name} />
          <textarea
            className="textarea"
            name="description"
            onChange={updateField}
            placeholder="Descripción"
            value={form.description}
          />
          <select className="select" name="level" onChange={updateField} value={form.level}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <input
            className="field"
            max="7"
            min="1"
            name="days_per_week"
            onChange={updateField}
            type="number"
            value={form.days_per_week}
          />
          <button className="btn btn-primary" disabled={submitting} type="submit">
            {submitting ? "Guardando..." : "Guardar rutina"}
          </button>
        </form>

        <div className="card padded">
          <div className="section-title">Rutinas registradas</div>
          <div className="list">
            {routines.length ? (
              routines.map((routine) => (
                <div key={routine.id} className="list-item">
                  <div>
                    <strong>{routine.name}</strong>
                    <div className="muted">{routine.description || "Sin descripción"}</div>
                  </div>
                  <span>{routine.days_per_week} días/semana</span>
                </div>
              ))
            ) : (
              <div className="empty">No hay rutinas registradas.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
