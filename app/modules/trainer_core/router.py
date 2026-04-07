from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.modules.trainer_core.repository import TrainerRepository
from app.modules.trainer_core.schemas import (
    GoalResponse,
    GoalSchema,
    PhysicalProfileResponse,
    PhysicalProfileSchema,
    ProgressEntryResponse,
    ProgressEntrySchema,
    RoutineCreate,
    RoutineResponse,
    SessionCreate,
    SessionResponse,
)
from app.modules.trainer_core.selectors import TrainerSelectors
from app.modules.trainer_core.service import TrainerService

router = APIRouter(prefix="/trainer", tags=["trainer-core"])


@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db), user=Depends(get_current_user)
) -> dict[str, int]:
    return TrainerSelectors(db).get_dashboard(user.id)


@router.get("/profile", response_model=PhysicalProfileResponse)
def get_profile(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return TrainerService(TrainerRepository(db)).get_profile(user.id)


@router.put("/profile", response_model=PhysicalProfileResponse)
def upsert_profile(
    payload: PhysicalProfileSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return TrainerService(TrainerRepository(db)).upsert_profile(user.id, payload)


@router.get("/routines", response_model=list[RoutineResponse])
def list_routines(
    db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return TrainerService(TrainerRepository(db)).list_routines(user.id)


@router.get("/goals", response_model=list[GoalResponse])
def list_goals(
    db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return TrainerService(TrainerRepository(db)).list_goals(user.id)


@router.post("/goals", response_model=GoalResponse)
def create_goal(
    payload: GoalSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return TrainerService(TrainerRepository(db)).create_goal(user.id, payload)


@router.post("/routines", response_model=RoutineResponse)
def create_routine(
    payload: RoutineCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return TrainerService(TrainerRepository(db)).create_routine(user.id, payload)


@router.post("/sessions", response_model=SessionResponse)
def create_session(
    payload: SessionCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return TrainerService(TrainerRepository(db)).register_session(user.id, payload)


@router.get("/sessions", response_model=list[SessionResponse])
def list_sessions(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return TrainerService(TrainerRepository(db)).list_sessions(user.id)


@router.post("/progress", response_model=ProgressEntryResponse)
def add_progress(payload: ProgressEntrySchema, db: Session = Depends(get_db)):
    return TrainerService(TrainerRepository(db)).add_progress_entry(payload)
