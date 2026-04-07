from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_coach_user, get_db
from app.modules.coach.schemas import CoachAthleteSummary, CoachDashboardResponse
from app.modules.coach.selectors import CoachSelectors

router = APIRouter(prefix="/coach", tags=["coach"])


@router.get("/dashboard", response_model=CoachDashboardResponse)
def get_dashboard(db: Session = Depends(get_db), _=Depends(get_coach_user)):
    return CoachSelectors(db).dashboard()


@router.get("/athletes", response_model=list[CoachAthleteSummary])
def list_athletes(db: Session = Depends(get_db), _=Depends(get_coach_user)):
    return CoachSelectors(db).athletes()
