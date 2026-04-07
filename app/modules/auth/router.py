from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.modules.auth.repository import AuthRepository
from app.modules.auth.schemas import (
    AuthResponse,
    ChangePasswordRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    TokenPair,
    UpdateSettingsRequest,
    UserResponse,
)
from app.modules.auth.service import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=AuthResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> AuthResponse:
    service = AuthService(AuthRepository(db))
    user, access_token, refresh_token = service.register(payload)
    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    service = AuthService(AuthRepository(db))
    user, access_token, refresh_token = service.login(payload.email, payload.password)
    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
        refresh_token=refresh_token,
    )


@router.post("/refresh", response_model=TokenPair)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)) -> TokenPair:
    access_token, refresh_token = AuthService(AuthRepository(db)).refresh(payload.refresh_token)
    return TokenPair(access_token=access_token, refresh_token=refresh_token)


@router.post("/logout")
def logout() -> dict[str, str]:
    return {"message": "logged out"}


@router.get("/me", response_model=UserResponse)
def me(user=Depends(get_current_user)) -> UserResponse:
    return UserResponse.model_validate(user)


@router.get("/settings", response_model=UserResponse)
def get_settings(user=Depends(get_current_user)) -> UserResponse:
    return UserResponse.model_validate(user)


@router.patch("/settings", response_model=UserResponse)
def update_settings(
    payload: UpdateSettingsRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
) -> UserResponse:
    service = AuthService(AuthRepository(db))
    updated = service.update_settings(user.id, payload)
    return UserResponse.model_validate(updated)


@router.post("/change-password")
def change_password(
    payload: ChangePasswordRequest,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
) -> dict[str, str]:
    service = AuthService(AuthRepository(db))
    service.change_password(user.id, payload.current_password, payload.new_password)
    return {"message": "password updated"}
