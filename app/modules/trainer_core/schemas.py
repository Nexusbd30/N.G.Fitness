from datetime import date, datetime

from pydantic import BaseModel, Field


class PhysicalProfileSchema(BaseModel):
    weight_kg: float | None = None
    height_cm: float | None = None
    experience_level: str = "beginner"
    general_goal: str | None = None


class PhysicalProfileResponse(PhysicalProfileSchema):
    id: str
    user_id: str

    model_config = {"from_attributes": True}


class GoalSchema(BaseModel):
    type: str
    description: str
    target_date: date | None = None
    active: bool = True


class GoalResponse(GoalSchema):
    id: str
    user_id: str

    model_config = {"from_attributes": True}


class RoutineCreate(BaseModel):
    name: str
    description: str | None = None
    level: str = "beginner"
    days_per_week: int = Field(default=3, ge=1, le=7)


class ExerciseSchema(BaseModel):
    name: str
    muscle_group: str
    type: str
    instructions: str | None = None


class SessionCreate(BaseModel):
    routine_id: str
    event_id: str
    date: datetime
    notes: str | None = None


class ProgressEntrySchema(BaseModel):
    session_id: str
    exercise_id: str
    sets_completed: int = 0
    reps_completed: int = 0
    load_kg: float | None = None
    rpe: float | None = None


class RoutineResponse(RoutineCreate):
    id: str
    user_id: str

    model_config = {"from_attributes": True}


class SessionResponse(BaseModel):
    id: str
    user_id: str
    routine_id: str
    event_id: str
    date: datetime
    duration_real: int | None = None
    completed: bool
    notes: str | None = None

    model_config = {"from_attributes": True}


class ProgressEntryResponse(ProgressEntrySchema):
    id: str

    model_config = {"from_attributes": True}
