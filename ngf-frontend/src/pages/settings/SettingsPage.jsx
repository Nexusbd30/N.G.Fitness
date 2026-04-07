import { useEffect, useState } from "react";
import { changePassword, getSettings, updateSettings } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({ email: "", full_name: "" });
  const [passwords, setPasswords] = useState({ current_password: "", new_password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await getSettings();
        setSettings({
          email: response.email ?? "",
          full_name: response.full_name ?? "",
        });
      } catch {
        setError("No se pudo cargar settings.");
      }
    }

    load();
  }, []);

  function updateSettingsField(event) {
    const { name, value } = event.target;
    setSettings((current) => ({ ...current, [name]: value }));
  }

  function updatePasswordField(event) {
    const { name, value } = event.target;
    setPasswords((current) => ({ ...current, [name]: value }));
  }

  async function saveAccount(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await updateSettings(settings);
      setMessage("Cuenta actualizada.");
    } catch {
      setError("No se pudo actualizar la cuenta.");
    }
  }

  async function savePassword(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await changePassword(passwords);
      setPasswords({ current_password: "", new_password: "" });
      setMessage("Contraseña actualizada.");
    } catch {
      setError("No se pudo cambiar la contraseña.");
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Settings</h1>
        <p className="muted">Configuración de cuenta y seguridad.</p>
      </div>

      {message ? <div className="card padded success-text">{message}</div> : null}
      {error ? <div className="card padded error-text">{error}</div> : null}

      <div className="grid grid-2">
        <form className="card padded list" onSubmit={saveAccount}>
          <div className="section-title">Cuenta</div>
          <input className="field" disabled value={user?.role ?? ""} />
          <input className="field" name="full_name" onChange={updateSettingsField} placeholder="Nombre" value={settings.full_name} />
          <input className="field" name="email" onChange={updateSettingsField} type="email" value={settings.email} />
          <button className="btn btn-primary" type="submit">
            Guardar cambios
          </button>
        </form>

        <form className="card padded list" onSubmit={savePassword}>
          <div className="section-title">Seguridad</div>
          <input
            className="field"
            name="current_password"
            onChange={updatePasswordField}
            placeholder="Contraseña actual"
            type="password"
            value={passwords.current_password}
          />
          <input
            className="field"
            name="new_password"
            onChange={updatePasswordField}
            placeholder="Nueva contraseña"
            type="password"
            value={passwords.new_password}
          />
          <button className="btn btn-primary" type="submit">
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
