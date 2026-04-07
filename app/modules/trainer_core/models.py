from datetime import date, datetime
from uuid import uuid4

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.config import settings
from app.db.base import Base, SoftDeleteMixin

try:
    from sqlalchemy_utils import EncryptedType
    from sqlalchemy_utils.types.encrypted.encrypted_type import AesEngine
except ModuleNotFoundError:
    EncryptedType = None
    AesEngine = None


def encrypted_float_type():
    # Fallback de desarrollo: permite arrancar la app aunque falte sqlalchemy_utils.
    # En producción debe instalarse la dependencia para cifrar estos campos.
    if EncryptedType is None or AesEngine is None:
        return Float
    return EncryptedType(Float, settings.encryption_key, AesEngine, "pkcs5")


class PhysicalProfile(Base, SoftDeleteMixin):
    __tablename__ = "physical_profiles"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, unique=True, index=True)
    weight_kg: Mapped[float | None] = mapped_column(
        encrypted_float_type(),
        nullable=True,
    )
    height_cm: Mapped[float | None] = mapped_column(
        encrypted_float_type(),
        nullable=True,
    )
    experience_level: Mapped[str] = mapped_column(String(50), default="beginner")
    general_goal: Mapped[str | None] = mapped_column(Text, nullable=True)


class Goal(Base, SoftDeleteMixin):
    __tablename__ = "goals"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, index=True)
    type: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(Text)
    target_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)


class Routine(Base, SoftDeleteMixin):
    __tablename__ = "routines"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, index=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    level: Mapped[str] = mapped_column(String(50), default="beginner")
    days_per_week: Mapped[int] = mapped_column(Integer, default=3)


class Exercise(Base):
    __tablename__ = "exercises"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    name: Mapped[str] = mapped_column(String(255), index=True)
    muscle_group: Mapped[str] = mapped_column(String(100))
    type: Mapped[str] = mapped_column(String(100))
    instructions: Mapped[str | None] = mapped_column(Text, nullable=True)


class Session(Base, SoftDeleteMixin):
    __tablename__ = "sessions"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String, index=True)
    routine_id: Mapped[str] = mapped_column(String, ForeignKey("routines.id"), index=True)
    event_id: Mapped[str] = mapped_column(String, index=True)
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    duration_real: Mapped[int | None] = mapped_column(Integer, nullable=True)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)


class ProgressHistory(Base):
    __tablename__ = "progress_history"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid4()))
    session_id: Mapped[str] = mapped_column(String, ForeignKey("sessions.id"), index=True)
    exercise_id: Mapped[str] = mapped_column(String, ForeignKey("exercises.id"), index=True)
    sets_completed: Mapped[int] = mapped_column(Integer, default=0)
    reps_completed: Mapped[int] = mapped_column(Integer, default=0)
    load_kg: Mapped[float | None] = mapped_column(Float, nullable=True)
    rpe: Mapped[float | None] = mapped_column(Float, nullable=True)
