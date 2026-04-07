import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const initialLogin = {
  email: "",
  password: "",
};

const initialRegister = {
  email: "",
  password: "",
  full_name: "",
  role: "athlete",
};

const heroStats = [
  { label: "Heart Rate", value: "164 BPM" },
  { label: "VO2 Max", value: "58.4" },
  { label: "Weekly Volume", value: "12.4 hrs" },
];

const featureBlocks = [
  {
    title: "Precision Coaching",
    description:
      "Manage entire professional rosters with surgical precision. Coordinate schedules, analyze kinetic feedback, and adjust nutrition in real time.",
    icon: "sports",
  },
  {
    title: "Elite Athlete Hub",
    description:
      "Personal performance command center. Visualize every rep, every second, and every calorie with high-fidelity analytics.",
    icon: "fitness_center",
  },
  {
    title: "Data-Driven Insights",
    description:
      "Advanced ML algorithms predict fatigue and recovery cycles before they happen.",
    icon: "analytics",
  },
  {
    title: "Real-Time Sync",
    description: "Seamless cloud integration between athlete wearables and coach consoles.",
    icon: "timer",
  },
  {
    title: "Unified Ecosystem",
    description:
      "One platform for training, nutrition, messaging, and historical analysis.",
    icon: "hub",
  },
];

function targetFromRole() {
  return "/ngf-dashboard";
}

export default function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [mode, setMode] = useState(location.pathname === "/register" ? "register" : "login");
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [registerForm, setRegisterForm] = useState(initialRegister);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const title = useMemo(
    () => (mode === "login" ? "Secure entry to ProPerformance" : "Create a coach or athlete account"),
    [mode],
  );

  function updateLoginField(event) {
    const { name, value } = event.target;
    setLoginForm((current) => ({ ...current, [name]: value }));
  }

  function updateRegisterField(event) {
    const { name, value } = event.target;
    setRegisterForm((current) => ({ ...current, [name]: value }));
  }

  async function handleLogin(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(loginForm);
      navigate(targetFromRole(), { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.detail ?? "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await register(registerForm);
      navigate(targetFromRole(), { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.detail ?? "Unable to create the account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-brand">ProPerformance</div>
        <div className="landing-menu">
          <a href="#">Coaches</a>
          <a href="#">Athletes</a>
          <a href="#">Features</a>
          <a href="#">Pricing</a>
        </div>
        <div className="landing-actions">
        </div>
      </nav>

      <main className="landing-hero">
        <section className="hero-copy">
          <div className="hero-pill">
            <span className="material-symbols-outlined">electric_bolt</span>
            Next Generation Fitness
          </div>
          <h1>
            Performance <span className="text">Elite.</span>
            Designed for Champions.
          </h1>
          <p>
            Empowering world-class coaches and athletes with precise analytics, kinetic movement tracking, and elite-level coordination.
          </p>
          <div className="hero-cta">
            <button className="landing-btn primary">Get Started</button>
            <button className="landing-btn outlined">
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </button>
          </div>
        </section>

        <section className="hero-stats">
          {heroStats.map((stat) => (
            <article key={stat.label} className="hero-card">
              <div className="hero-card-label">{stat.label}</div>
              <div className="hero-card-value">{stat.value}</div>
            </article>
          ))}
        </section>
      </main>

      <section className="landing-split">
        <div className="auth-panel">
          <div className="auth-card">
            <header className="auth-header">
              <div>
                <h3>{mode === "login" ? "Login" : "Register"}</h3>
                <p>{title}</p>
              </div>
              <div className="auth-toggle">
                <button
                  className={mode === "login" ? "toggle-active" : ""}
                  onClick={() => setMode("login")}
                  type="button"
                >
                  Login
                </button>
                <button
                  className={mode === "register" ? "toggle-active" : ""}
                  onClick={() => setMode("register")}
                  type="button"
                >
                  Register
                </button>
              </div>
            </header>

            {error && <div className="form-error">{error}</div>}

            {mode === "login" ? (
              <form className="auth-form" onSubmit={handleLogin}>
                <label>
                  Email
                  <input name="email" onChange={updateLoginField} type="email" value={loginForm.email} />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    onChange={updateLoginField}
                    type="password"
                    value={loginForm.password}
                  />
                </label>
                <button className="landing-btn primary" disabled={submitting} type="submit">
                  {submitting ? "Signing in…" : "Access Console"}
                </button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleRegister}>
                <label>
                  Full name
                  <input name="full_name" onChange={updateRegisterField} value={registerForm.full_name} />
                </label>
                <label>
                  Email
                  <input name="email" onChange={updateRegisterField} type="email" value={registerForm.email} />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    onChange={updateRegisterField}
                    type="password"
                    value={registerForm.password}
                  />
                </label>
                <label>
                  Role
                  <select name="role" onChange={updateRegisterField} value={registerForm.role}>
                    <option value="athlete">Athlete</option>
                    <option value="coach">Coach</option>
                  </select>
                </label>
                <button className="landing-btn primary" disabled={submitting} type="submit">
                  {submitting ? "Creating account…" : "Create Account"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="landing-features">
          <header>
            <h2>System Architecture</h2>
            <div className="feature-line" />
          </header>
          <div className="feature-grid">
            {featureBlocks.map((block) => (
              <article key={block.title} className="feature-card">
                <span className="material-symbols-outlined feature-icon">{block.icon}</span>
                <h3>{block.title}</h3>
                <p>{block.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="cta-card">
          <h2>Ready to redefine your performance?</h2>
          <p>Join the elite community of coaches and athletes already pushing the boundaries.</p>
          <div className="cta-actions">
            <button className="landing-btn primary">Create Free Account</button>
            <button className="landing-btn outlined">Sign In to Console</button>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <div className="landing-brand">ProPerformance</div>
          <p>© 2026 right reservated to NEXUSBD.</p>
        </div>
        <div className="landing-menu">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  );
}
