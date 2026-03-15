/**
 * modules/auth/pages/RegisterPage.jsx
 * Página de registro de nuevos usuarios.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../../api/authApi';
import { authStorage } from '../../../utils/authStorage';
import { useToast } from '../../../hooks/useToast';

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const toast    = useToast();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      const { data } = await authApi.register({
        name:     form.name,
        email:    form.email,
        password: form.password,
      });
      authStorage.setTokens(data);
      toast.success('Cuenta creada. ¡Bienvenido!');
      navigate('/dashboard');
    } catch {
      toast.error('Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-800">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          N<span className="text-emerald-400">.</span>G
          <span className="text-emerald-400">.</span>F
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">Crear cuenta</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Nombre',             name: 'name',     type: 'text'     },
            { label: 'Email',              name: 'email',    type: 'email'    },
            { label: 'Contraseña',         name: 'password', type: 'password' },
            { label: 'Repetir contraseña', name: 'confirm',  type: 'password' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm text-gray-400 mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 text-white px-4 py-2.5 rounded-lg
                           border border-gray-700 focus:border-emerald-500 outline-none transition-colors"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50
                       text-white font-semibold rounded-lg transition-colors mt-2"
          >
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
