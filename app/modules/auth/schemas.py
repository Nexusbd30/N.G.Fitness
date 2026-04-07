from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "athlete"


class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    email: str
    role: str
    full_name: str | None = None

    model_config = {"from_attributes": True}


class AuthResponse(TokenPair):
    user: UserResponse


class RefreshRequest(BaseModel):
    refresh_token: str


class UpdateSettingsRequest(BaseModel):
    full_name: str | None = None
    email: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
