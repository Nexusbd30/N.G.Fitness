const services = [
  {
    title: "Gestión de Entrenamiento",
    description:
      "Crea planes complejos con variables de carga dinámicas, periodización avanzada y feedback instantáneo de ejecución.",
    icon: "fitness_center",
  },
  {
    title: "Seguimiento de Nutrición",
    description:
      "Sincroniza macronutrientes, hidratación y suplementación basada en el gasto energético real.",
    icon: "restaurant",
  },
  {
    title: "Análisis de Progreso",
    description:
      "Visualizaciones ML que cruzan métricas de rendimiento con datos biométricos para una visión 360.",
    icon: "query_stats",
  },
];

const highlights = [
  { label: "Uptime garantizado", value: "99.9%" },
  { label: "Equipos integrados", value: "2,400+" },
];

const news = [
  {
    title: "Lanzamiento N.G.F Intelligence",
    detail: "Módulo de progresión con IA explicable disponible hoy.",
  },
  {
    title: "Expansión global",
    detail: "Integraciones en LATAM, Europa y Medio Oriente completadas.",
  },
  {
    title: "Comunidad en vivo",
    detail: "1,200 entrenadores asistieron al webinar técnico.",
  },
];

export default function NGFFitnessDashboard() {
  return (
    <div className="apex-panel">
      <nav className="apex-nav">
        <div className="apex-brand">Apex Trainers</div>
        <div className="apex-links">
          <a>Programas</a>
          <a>Atletas</a>
          <a>Metas</a>
          <a>Comunidad</a>
        </div>
        <div className="apex-actions">
          <button className="ghost">Login</button>
          <button className="primary">Get Started</button>
        </div>
      </nav>

      <header className="apex-hero">
        <div>
          <p className="tag">ÉLÉVATE AL SIGUIENTE NIVEL</p>
          <h1>
            Elevando el rendimiento de tus <span>atletas</span>
          </h1>
          <p>
            La plataforma definitiva para entrenadores de élite. Precisión arquitectónica en la planificación y profundidad analítica
            para resultados excepcionales.
          </p>
          <div className="hero-buttons">
            <button className="start">Empezar ahora</button>
            <button className="demo">Ver demostración</button>
          </div>
        </div>
        <div className="hero-card">
          <div className="mini-card">
            <span className="material-symbols-outlined">analytics</span>
            <p>Resultados Medibles</p>
            <small>Sincronización en tiempo real con dispositivos</small>
          </div>
        </div>
      </header>

      <section className="apex-services">
        <div className="section-title">
          <div>
            <h2>Ecosistema de Alto Rendimiento</h2>
            <p>Herramientas diseñadas con precisión milimétrica para cada aspecto del desarrollo deportivo.</p>
          </div>
          <a>Explorar soluciones</a>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <div className="service-icon">
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="apex-bento">
        <div className="bento-main">
          <div className="bento-overlay">
            <p>Precision Engineering</p>
            <h2>Arquitectura diseñada para quienes construyen el futuro.</h2>
            <p>Unifica todos los puntos de contacto con latencia sub-segundo y visualizaciones en vivo.</p>
            <button className="start">Explore Engine</button>
          </div>
        </div>
        <div className="bento-side">
          {highlights.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="apex-news">
        <h2>Noticias</h2>
        <div className="news-grid">
          {news.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <span>Actualizado recientemente</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="apex-footer">
        <p>© 2024 Apex Trainers. All rights reserved.</p>
        <div className="footer-links">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Social</a>
        </div>
      </footer>
    </div>
  );
}
