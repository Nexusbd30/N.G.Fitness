# N.G.Fitness Backend

Backend del proyecto **N.G.Fitness** construido con **FastAPI**.

Estado actual: base inicial del proyecto con estructura modular y endpoints de salud.

## Stack

- Python 3.11+
- FastAPI
- Uvicorn

## Estructura del proyecto

```text
N.G.Fitness/
|-- app/
|   |-- core/
|   |-- db/
|   |-- modules/
|   |   |-- agenda/
|   |   |-- auth/
|   |   |-- health/
|   |   |-- middlewares/
|   |   |-- tests/
|   |   `-- trainer_core/
|   `-- shared/
|       `-- schemas/
|-- main.py
|-- Dockerfile
`-- README.md
```

## Requisitos

- Python 3.11 o superior
- `pip` actualizado

## Configuracion del entorno (Windows / PowerShell)

Desde la carpeta raiz del repositorio:

```powershell
cd .\N.G.Fitness
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install fastapi uvicorn
```

Si ya tienes un entorno virtual creado en otra carpeta (por ejemplo en la raiz del workspace), puedes usarlo sin recrearlo.

## Ejecucion en desarrollo

```powershell
cd .\N.G.Fitness
uvicorn main:app --reload
```

Servidor local por defecto:

- API: `http://127.0.0.1:8000`
- Documentacion Swagger: `http://127.0.0.1:8000/docs`
- Documentacion ReDoc: `http://127.0.0.1:8000/redoc`

## Endpoints disponibles

- `GET /`  
  Respuesta base del servicio.

- `GET /health`  
  Healthcheck del backend.

Ejemplos de respuesta:

```json
{"message": "N.G.Fitness backend is running"}
```

```json
{"status": "ok"}
```

## Ejecutar con Python directamente (opcional)

```powershell
cd .\N.G.Fitness
python -m uvicorn main:app --reload
```

## Docker

`Dockerfile` existe pero aun no esta implementado (actualmente vacio).

## Estado del proyecto

Implementado:

- Estructura modular inicial.
- Aplicacion FastAPI base en `main.py`.
- Endpoints `/` y `/health`.

Pendiente recomendado:

- Configuracion centralizada (`app/core/config.py`).
- Conexion a base de datos (`app/db/`).
- Routers por modulo en `app/modules/*`.
- Tests automatizados.
- `requirements.txt` o `pyproject.toml`.
- Dockerfile funcional y `docker-compose`.

## Convenciones sugeridas

- Mantener logica por dominio en `app/modules/<modulo>`.
- Exponer rutas via `APIRouter` por modulo e incluirlas en `main.py`.
- Compartir esquemas comunes en `app/shared/schemas`.
- Evitar logica de negocio en `main.py` (dejar solo wiring de aplicacion).

## Comandos utiles

Verificar sintaxis de `main.py`:

```powershell
python -m py_compile main.py
```

Listar rutas activas en docs:

- `http://127.0.0.1:8000/docs`

## Licencia

Pendiente de definir.

