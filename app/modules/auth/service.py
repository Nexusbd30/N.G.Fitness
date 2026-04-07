from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.modules.auth.models import User
from app.modules.auth.repository import AuthRepository
from app.modules.auth.schemas import RegisterRequest, UpdateSettingsRequest
from app.shared.exceptions import DomainError
from app.shared.utils import utc_now


class AuthService:
    def __init__(self, repository: AuthRepository) -> None:
        self.repository = repository

    def register(self, payload: RegisterRequest) -> tuple[User, str, str]:
        if self.repository.get_by_email(payload.email):
            raise DomainError("Email already registered", status_code=409)
        role = payload.role.strip().lower()
        if role not in {"coach", "athlete"}:
            raise DomainError("Invalid role", status_code=422)
        user = User(
            email=payload.email,
            hashed_password=hash_password(payload.password),
            full_name=payload.full_name,
            role=role,
            created_at=utc_now(),
        )
        user = self.repository.create(user)
        return user, create_access_token(user.id), create_refresh_token(user.id)

    def login(self, email: str, password: str) -> tuple[User, str, str]:
        user = self.repository.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise DomainError("Invalid credentials", status_code=401)
        return user, create_access_token(user.id), create_refresh_token(user.id)

    def refresh(self, refresh_token: str) -> tuple[str, str]:
        try:
            payload = decode_token(refresh_token)
        except ValueError as exc:
            raise DomainError("Invalid refresh token", status_code=401) from exc

        if payload.get("type") != "refresh":
            raise DomainError("Invalid token type", status_code=401)

        user = self.repository.get_by_id(payload["sub"])
        if not user:
            raise DomainError("User not found", status_code=404)

        return create_access_token(user.id), create_refresh_token(user.id)

    def get_user(self, user_id: str) -> User:
        user = self.repository.get_by_id(user_id)
        if not user:
            raise DomainError("User not found", status_code=404)
        return user

    def update_settings(self, user_id: str, payload: UpdateSettingsRequest) -> User:
        user = self.get_user(user_id)
        existing = self.repository.get_by_email(payload.email)
        if existing and existing.id != user_id:
            raise DomainError("Email already registered", status_code=409)

        user.email = payload.email.strip().lower()
        user.full_name = payload.full_name
        return self.repository.update(user)

    def change_password(self, user_id: str, current_password: str, new_password: str) -> None:
        user = self.get_user(user_id)
        if not verify_password(current_password, user.hashed_password):
            raise DomainError("Current password is invalid", status_code=401)

        user.hashed_password = hash_password(new_password)
        self.repository.update(user)
