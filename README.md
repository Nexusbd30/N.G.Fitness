# N.G.Fitness

Scaffold técnico de **Next Generation Fitness** basado en la documentación de arquitectura v2.0 para Fase 1 y 2.

## Stack

- Backend: FastAPI + SQLAlchemy + Alembic + PostgreSQL
- Frontend: React + Vite + Tailwind CSS
- Autenticación: JWT access/refresh token
- Persistencia: soft-delete universal y estructura preparada para cifrado de campos sensibles

## Backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -e .[dev]
uvicorn app.main:app --reload
```

## Frontend

```powershell
cd .\ngf-frontend
npm install
npm run dev
```

## Estado

Este scaffold implementa estructura por dominios, contratos base de API, modelos ORM iniciales, shell frontend y configuración mínima. Queda pendiente completar lógica avanzada, migraciones reales y tests.
