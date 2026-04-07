import { useEffect, useState } from "react";
import { getCoachAthletes, getCoachDashboard } from "../../api/coach";

export default function CoachDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [athletes, setAthletes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [dashboardResponse, athletesResponse] = await Promise.all([
          getCoachDashboard(),
          getCoachAthletes(),
        ]);
        setDashboard(dashboardResponse);
        setAthletes(athletesResponse);
      } catch {
        setError("No se pudo cargar el panel del coach.");
      }
    }

    load();
  }, []);

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Panel del coach</h1>
        <p className="muted">Visión global del sistema para seguimiento operativo de atletas.</p>
      </div>

      {error ? <div className="card padded">{error}</div> : null}

      <div className="grid grid-4">
        <div className="card padded">
          <div className="section-title">Atletas</div>
          <div className="stat-value">{dashboard?.athletes ?? 0}</div>
        </div>
        <div className="card padded">
          <div className="section-title">Rutinas</div>
          <div className="stat-value">{dashboard?.routines ?? 0}</div>
        </div>
        <div className="card padded">
          <div className="section-title">Sesiones</div>
          <div className="stat-value">{dashboard?.sessions ?? 0}</div>
        </div>
        <div className="card padded">
          <div className="section-title">Eventos</div>
          <div className="stat-value">{dashboard?.events ?? 0}</div>
        </div>
      </div>

      <div className="card padded">
        <div className="split">
          <div className="section-title">Atletas registrados</div>
          <span className="pill">{athletes.length} atletas</span>
        </div>
        <div className="list">
          {athletes.length ? (
            athletes.map((athlete) => (
              <div key={athlete.id} className="list-item">
                <div className="split">
                  <div>
                    <strong>{athlete.full_name || athlete.email}</strong>
                    <div className="muted">{athlete.email}</div>
                  </div>
                  <div className="grid grid-3 compact-grid">
                    <div>
                      <strong>{athlete.routines}</strong>
                      <div className="muted">Rutinas</div>
                    </div>
                    <div>
                      <strong>{athlete.sessions}</strong>
                      <div className="muted">Sesiones</div>
                    </div>
                    <div>
                      <strong>{athlete.goals}</strong>
                      <div className="muted">Objetivos</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty">Todavía no hay atletas registrados en la plataforma.</div>
          )}
        </div>
      </div>
    </div>
  );
}
