from pydantic import BaseModel


class CoachDashboardResponse(BaseModel):
    athletes: int
    routines: int
    sessions: int
    events: int
    active_goals: int


class CoachAthleteSummary(BaseModel):
    id: str
    email: str
    full_name: str | None = None
    routines: int
    sessions: int
    goals: int
