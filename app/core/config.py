import json
import os
from dataclasses import dataclass, field
from functools import lru_cache


def _get_env(name: str, default: str) -> str:
    return os.getenv(f"NGF_{name}", default)


def _get_bool(name: str, default: bool) -> bool:
    return _get_env(name, str(default)).strip().lower() in {"1", "true", "yes", "on"}


def _get_int(name: str, default: int) -> int:
    return int(_get_env(name, str(default)))


def _get_origins() -> list[str]:
    raw = _get_env("ALLOWED_ORIGINS", '["http://localhost:5173"]')
    try:
        value = json.loads(raw)
        if isinstance(value, list):
            return [str(item) for item in value]
    except json.JSONDecodeError:
        pass
    return ["http://localhost:5173"]


@dataclass(frozen=True)
class Settings:
    env: str = field(default_factory=lambda: _get_env("ENV", "development"))
    app_name: str = field(default_factory=lambda: _get_env("APP_NAME", "Next Generation Fitness API"))
    api_prefix: str = field(default_factory=lambda: _get_env("API_PREFIX", "/api/v1"))
    debug: bool = field(default_factory=lambda: _get_bool("DEBUG", True))
    secret_key: str = field(default_factory=lambda: _get_env("SECRET_KEY", "change-me"))
    access_token_expire_minutes: int = field(
        default_factory=lambda: _get_int("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
    )
    refresh_token_expire_days: int = field(
        default_factory=lambda: _get_int("REFRESH_TOKEN_EXPIRE_DAYS", 7)
    )
    database_url: str = field(default_factory=lambda: _get_env("DATABASE_URL", "sqlite:///./ngf.db"))
    encryption_key: str = field(default_factory=lambda: _get_env("ENCRYPTION_KEY", "change-me-32-bytes"))
    allowed_origins: list[str] = field(default_factory=_get_origins)


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
