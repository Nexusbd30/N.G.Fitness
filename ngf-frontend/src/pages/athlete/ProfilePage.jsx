import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "../../api/trainer";
import { useAuth } from "../../context/AuthContext";

const initialProfile = {
  weight_kg: "",
  height_cm: "",
  experience_level: "beginner",
  general_goal: "",
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(initialProfile);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const response = await getProfile();
        setProfile({
          weight_kg: response.weight_kg ?? "",
          height_cm: response.height_cm ?? "",
          experience_level: response.experience_level ?? "beginner",
          general_goal: response.general_goal ?? "",
        });
      } catch {
        setError("No se pudo cargar el perfil físico.");
      }
    }

    load();
  }, []);

  function updateField(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await saveProfile({
        weight_kg: profile.weight_kg === "" ? null : Number(profile.weight_kg),
        height_cm: profile.height_cm === "" ? null : Number(profile.height_cm),
        experience_level: profile.experience_level,
        general_goal: profile.general_goal || null,
      });
      setMessage("Perfil guardado.");
    } catch {
      setError("No se pudo guardar el perfil físico.");
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="hero-title">Perfil</h1>
        <p className="muted">Cuenta y perfil físico del atleta.</p>
      </div>

      {message ? <div className="card padded success-text">{message}</div> : null}
      {error ? <div className="card padded error-text">{error}</div> : null}

      <div className="grid grid-2">
        <div className="card padded">
          <div className="section-title">Cuenta</div>
          <div className="list">
            <div className="list-item">
              <strong>Email</strong>
              <div className="muted">{user?.email ?? "-"}</div>
            </div>
            <div className="list-item">
              <strong>Rol</strong>
              <div className="muted">{user?.role ?? "-"}</div>
            </div>
            <div className="list-item">
              <strong>ID</strong>
              <div className="muted">{user?.id ?? "-"}</div>
            </div>
          </div>
        </div>

        <form className="card padded list" onSubmit={handleSubmit}>
          <div className="section-title">Perfil físico</div>
          <input className="field" name="weight_kg" onChange={updateField} placeholder="Peso (kg)" value={profile.weight_kg} />
          <input className="field" name="height_cm" onChange={updateField} placeholder="Altura (cm)" value={profile.height_cm} />
          <select className="select" name="experience_level" onChange={updateField} value={profile.experience_level}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <textarea
            className="textarea"
            name="general_goal"
            onChange={updateField}
            placeholder="Objetivo general"
            value={profile.general_goal}
          />
          <button className="btn btn-primary" type="submit">
            Guardar perfil
          </button>
        </form>
      </div>
    </div>
  );
}
