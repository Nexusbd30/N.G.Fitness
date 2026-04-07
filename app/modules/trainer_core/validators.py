from app.modules.trainer_core.schemas import RoutineCreate


def validate_routine_payload(payload: RoutineCreate) -> None:
    if not payload.name.strip():
        raise ValueError("Routine name is required")
