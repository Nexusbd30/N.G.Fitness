import base64
import hashlib
import hmac
import json
import secrets
from datetime import datetime, timedelta, timezone

from app.core.config import settings


def _b64encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).rstrip(b"=").decode("utf-8")


def _b64decode(value: str) -> bytes:
    padding = "=" * (-len(value) % 4)
    return base64.urlsafe_b64decode(value + padding)


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"{salt}${digest.hex()}"


def verify_password(password: str, hashed_password: str) -> bool:
    try:
        salt, digest = hashed_password.split("$", maxsplit=1)
    except ValueError:
        return False
    candidate = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return hmac.compare_digest(candidate.hex(), digest)


def _encode_token(subject: str, token_type: str, expires_delta: timedelta) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {
        "sub": subject,
        "type": token_type,
        "exp": int((datetime.now(timezone.utc) + expires_delta).timestamp()),
    }
    header_segment = _b64encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_segment = _b64encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signing_input = f"{header_segment}.{payload_segment}".encode("utf-8")
    signature = hmac.new(settings.secret_key.encode("utf-8"), signing_input, hashlib.sha256).digest()
    return f"{header_segment}.{payload_segment}.{_b64encode(signature)}"


def create_access_token(subject: str) -> str:
    return _encode_token(
        subject,
        "access",
        timedelta(minutes=settings.access_token_expire_minutes),
    )


def create_refresh_token(subject: str) -> str:
    return _encode_token(
        subject,
        "refresh",
        timedelta(days=settings.refresh_token_expire_days),
    )


def decode_token(token: str) -> dict:
    try:
        header_segment, payload_segment, signature_segment = token.split(".")
    except ValueError as exc:
        raise ValueError("Malformed token") from exc

    signing_input = f"{header_segment}.{payload_segment}".encode("utf-8")
    expected_signature = hmac.new(
        settings.secret_key.encode("utf-8"),
        signing_input,
        hashlib.sha256,
    ).digest()
    if not hmac.compare_digest(_b64encode(expected_signature), signature_segment):
        raise ValueError("Invalid token signature")

    payload = json.loads(_b64decode(payload_segment).decode("utf-8"))
    if int(payload["exp"]) < int(datetime.now(timezone.utc).timestamp()):
        raise ValueError("Token expired")
    return payload
