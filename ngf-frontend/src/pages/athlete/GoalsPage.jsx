import { useEffect, useState } from "react";
import { createGoal, getGoals } from "../../api/trainer";

const initialForm = {
  type: "",
  description: "",
  target_date: "",
  active: true,
};

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadGoals() {
    try {
      const response = await getGoals();
      setGoals(response);
    } catch {
      setError("No se pudieron cargar los objetivos.");
    }
  }

  useEffect(() => {
    loadGoals();
  }, []);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createGoal({
        ...form,
        target_date: form.target_date || null,
      });
      setForm(initialForm);
      await loadGoals();
    } catch {
      setError("No se pudo crear el objetivo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Objetivos</h1>
        <p className="muted">Alta y consulta de metas de entrenamiento.</p>
      </div>

      {error ? <div className="card padded">{error}</div> : null}

      <div className="grid grid-2">
        <form className="card padded list" onSubmit={handleSubmit}>
          <div className="section-title">Nuevo objetivo</div>
          <input className="field" name="type" onChange={updateField} placeholder="Tipo" value={form.type} />
          <textarea
            className="textarea"
            name="description"
            onChange={updateField}
            placeholder="Descripción"
            value={form.description}
          />
          <input className="field" name="target_date" onChange={updateField} type="date" value={form.target_date} />
          <label className="split">
            <span className="muted">Activo</span>
            <input checked={form.active} name="active" onChange={updateField} type="checkbox" />
          </label>
          <button className="btn btn-primary" disabled={submitting} type="submit">
            {submitting ? "Guardando..." : "Guardar objetivo"}
          </button>
        </form>

        <div className="card padded">
          <div className="section-title">Objetivos activos</div>
          <div className="list">
            {goals.length ? (
              goals.map((goal) => (
                <div key={goal.id} className="list-item">
                  <div>
                    <strong>{goal.type}</strong>
                    <div className="muted">{goal.description}</div>
                  </div>
                  <span>{goal.target_date || "-"}</span>
                </div>
              ))
            ) : (
              <div className="empty">No hay objetivos registrados.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
