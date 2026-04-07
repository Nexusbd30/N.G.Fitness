from app.modules.trainer_core.models import (
    Goal,
    PhysicalProfile,
    ProgressHistory,
    Routine,
    Session as TrainingSession,
)
from app.modules.trainer_core.repository import TrainerRepository
from app.modules.trainer_core.schemas import (
    GoalSchema,
    PhysicalProfileSchema,
    ProgressEntrySchema,
    RoutineCreate,
    SessionCreate,
)
from app.modules.trainer_core.validators import validate_routine_payload


class TrainerService:
    def __init__(self, repository: TrainerRepository) -> None:
        self.repository = repository

    def list_routines(self, user_id: str):
        return self.repository.list_routines(user_id)

    def create_routine(self, user_id: str, payload: RoutineCreate) -> Routine:
        validate_routine_payload(payload)
        routine = Routine(
            user_id=user_id,
            name=payload.name,
            description=payload.description,
            level=payload.level,
            days_per_week=payload.days_per_week,
        )
        return self.repository.create_routine(routine)

    def list_goals(self, user_id: str):
        return self.repository.list_goals(user_id)

    def create_goal(self, user_id: str, payload: GoalSchema) -> Goal:
        goal = Goal(
            user_id=user_id,
            type=payload.type,
            description=payload.description,
            target_date=payload.target_date,
            active=payload.active,
        )
        return self.repository.create_goal(goal)

    def register_session(self, user_id: str, payload: SessionCreate) -> TrainingSession:
        session = TrainingSession(
            user_id=user_id,
            routine_id=payload.routine_id,
            event_id=payload.event_id,
            date=payload.date,
            notes=payload.notes,
        )
        return self.repository.create_session(session)

    def add_progress_entry(self, payload: ProgressEntrySchema) -> ProgressHistory:
        entry = ProgressHistory(**payload.model_dump())
        return self.repository.add_progress_entry(entry)

    def get_profile(self, user_id: str) -> PhysicalProfile:
        profile = self.repository.get_profile(user_id)
        if profile:
            return profile

        return self.repository.save_profile(PhysicalProfile(user_id=user_id))

    def upsert_profile(self, user_id: str, payload: PhysicalProfileSchema) -> PhysicalProfile:
        profile = self.repository.get_profile(user_id)
        if not profile:
            profile = PhysicalProfile(user_id=user_id)

        profile.weight_kg = payload.weight_kg
        profile.height_cm = payload.height_cm
        profile.experience_level = payload.experience_level
        profile.general_goal = payload.general_goal
        return self.repository.save_profile(profile)

    def list_sessions(self, user_id: str) -> list[TrainingSession]:
        return self.repository.list_sessions(user_id)
