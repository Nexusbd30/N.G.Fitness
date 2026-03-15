# N.G.F Frontend — Guía Completa v2.0

## Instalación rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de entorno
cp .env.example .env
# Editar VITE_API_URL si tu backend corre en otro puerto

# 3. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:5173
```

---

## Estructura completa

```
src/
│
├── main.jsx                        ← Punto de entrada React
├── App.jsx                         ← Router principal + Providers
│
├── styles/
│   └── index.css                   ← Tailwind @tailwind + animaciones
│
├── api/                            ← Capa HTTP (Axios)
│   ├── http.js                     ← Cliente base + interceptor refresh token
│   ├── authApi.js                  ← Endpoints de autenticación
│   ├── sessionsApi.js              ← Endpoints de sesiones
│   └── agendaApi.js                ← Endpoints de agenda
│
├── utils/
│   └── authStorage.js              ← Gestión de tokens en localStorage
│
├── context/                        ← Estado global
│   ├── AuthContext.jsx             ← Usuario, login, logout
│   └── ToastContext.jsx            ← Cola de notificaciones Toast
│
├── hooks/                          ← Hooks transversales (no pertenecen a un módulo)
│   └── useToast.js                 ← Lanza notificaciones desde cualquier módulo
│
├── components/                     ← Componentes globales reutilizables
│   ├── Layout/
│   │   └── Layout.jsx              ← Wrapper principal: Navbar + <Outlet/>
│   ├── Navbar/
│   │   └── Navbar.jsx              ← Barra de navegación con links y logout
│   ├── Toast/
│   │   └── ToastContainer.jsx      ← Renderiza la pila de toasts activos
│   └── ProtectedRoute.jsx          ← Guarda de ruta (redirige si no hay sesión)
│
└── modules/                        ← Módulos de dominio (autónomos)
    │
    ├── auth/
    │   ├── pages/
    │   │   ├── LoginPage.jsx        ← Formulario de login
    │   │   └── RegisterPage.jsx     ← Formulario de registro
    │   ├── components/             ← (vacío — añadir AuthForm, etc.)
    │   └── hooks/                  ← (vacío — añadir useRegister, etc.)
    │
    ├── dashboard/
    │   ├── pages/
    │   │   └── DashboardPage.jsx    ← Panel de resumen
    │   └── components/             ← (vacío — añadir StatsCard, RecentActivity)
    │
    ├── sessions/
    │   ├── pages/
    │   │   └── SessionsPage.jsx     ← Lista y gestión de sesiones
    │   ├── components/             ← (vacío — añadir SessionCard, SessionForm)
    │   └── hooks/
    │       └── useSessions.js       ← CRUD de sesiones + toasts integrados
    │
    ├── agenda/
    │   ├── pages/
    │   │   └── AgendaPage.jsx       ← Lista y gestión de citas
    │   ├── components/             ← (vacío — añadir EventCard, EventForm)
    │   └── hooks/
    │       └── useAgenda.js         ← CRUD de eventos + toasts integrados
    │
    ├── calendar/
    │   ├── pages/
    │   │   └── CalendarPage.jsx     ← Placeholder — conectar useCalendar
    │   ├── components/             ← (vacío — añadir CalendarGrid, etc.)
    │   └── hooks/                  ← (vacío — añadir useCalendar, useConflicts)
    │
    └── clients/
        ├── pages/
        │   └── ClientsPage.jsx      ← Placeholder — conectar useClients
        ├── components/             ← (vacío — añadir ClientCard, ClientForm)
        └── hooks/                  ← (vacío — añadir useClients)
```

---

## Flujo de datos

```
Componente / Página
      ↓  llama a
   Hook de dominio (useSessions, useAgenda…)
      ↓  llama a
   API layer (sessionsApi, agendaApi…)
      ↓  usa
   http.js (axios + interceptor refresh token)
      ↓  habla con
   Backend FastAPI  ←→  Base de datos
```

---

## Sistema de notificaciones (Toast)

Desde cualquier componente o hook:

```js
const toast = useToast();

toast.success('Sesión guardada');
toast.error('No se pudo conectar');
toast.info('Actualizando...');
toast.warning('Revisa el formulario');
```

Para que funcione, `<ToastProvider>` y `<ToastContainer />` ya están incluidos en `App.jsx`.

---

## Interceptor de refresh token

El interceptor en `api/http.js` funciona automáticamente:

1. Añade el `Authorization: Bearer <token>` en cada petición.
2. Si recibe **401**, renueva el token con el `refresh_token` guardado.
3. Reintenta la petición original con el nuevo token.
4. Si el refresh también falla → limpia localStorage y redirige a `/login`.

No es necesario gestionar tokens manualmente en los componentes.

---

## Variables de entorno

| Variable        | Descripción                        | Ejemplo                            |
|-----------------|------------------------------------|------------------------------------|
| `VITE_API_URL`  | URL base del backend FastAPI       | `http://localhost:8000/api/v1`     |

---

## Próximos pasos sugeridos

- [ ] Implementar `useCalendar.js` y `CalendarPage`
- [ ] Implementar `useClients.js` y `ClientsPage`
- [ ] Añadir formularios modales para crear sesiones/citas
- [ ] Conectar `DashboardPage` con datos reales de los hooks
- [ ] Añadir paginación en listados largos
