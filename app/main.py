from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.errors import register_exception_handlers
from app.db.init_db import init_db
from app.middlewares.audit_middleware import AuditMiddleware
from app.middlewares.request_id import RequestIDMiddleware
from app.modules.agenda.router import router as agenda_router
from app.modules.auth.router import router as auth_router
from app.modules.coach.router import router as coach_router
from app.modules.health.router import router as health_router
from app.modules.notifications.router import router as notifications_router
from app.modules.trainer_core.router import router as trainer_router


def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version="0.1.0")
    app.add_middleware(RequestIDMiddleware)
    app.add_middleware(AuditMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    register_exception_handlers(app)
    app.include_router(health_router)
    app.include_router(auth_router, prefix=settings.api_prefix)
    app.include_router(coach_router, prefix=settings.api_prefix)
    app.include_router(trainer_router, prefix=settings.api_prefix)
    app.include_router(agenda_router, prefix=settings.api_prefix)
    app.include_router(notifications_router, prefix=settings.api_prefix)

    @app.on_event("startup")
    def on_startup() -> None:
        init_db()

    return app


app = create_app()
