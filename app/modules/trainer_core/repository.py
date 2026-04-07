from sqlalchemy.orm import Session

from app.modules.trainer_core.models import (
    Goal,
    PhysicalProfile,
    ProgressHistory,
    Routine,
    Session as TrainingSession,
)


class TrainerRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_routines(self, user_id: str) -> list[Routine]:
        return self.db.query(Routine).filter(Routine.user_id == user_id).all()

    def create_routine(self, routine: Routine) -> Routine:
        self.db.add(routine)
        self.db.commit()
        self.db.refresh(routine)
        return routine

    def create_session(self, session: TrainingSession) -> TrainingSession:
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def add_progress_entry(self, entry: ProgressHistory) -> ProgressHistory:
        self.db.add(entry)
        self.db.commit()
        self.db.refresh(entry)
        return entry

    def list_goals(self, user_id: str) -> list[Goal]:
        return self.db.query(Goal).filter(Goal.user_id == user_id).all()

    def create_goal(self, goal: Goal) -> Goal:
        self.db.add(goal)
        self.db.commit()
        self.db.refresh(goal)
        return goal

    def get_profile(self, user_id: str) -> PhysicalProfile | None:
        return self.db.query(PhysicalProfile).filter(PhysicalProfile.user_id == user_id).first()

    def save_profile(self, profile: PhysicalProfile) -> PhysicalProfile:
        self.db.add(profile)
        self.db.commit()
        self.db.refresh(profile)
        return profile

    def list_sessions(self, user_id: str) -> list[TrainingSession]:
        return (
            self.db.query(TrainingSession)
            .filter(TrainingSession.user_id == user_id)
            .order_by(TrainingSession.date.desc())
            .all()
        )
