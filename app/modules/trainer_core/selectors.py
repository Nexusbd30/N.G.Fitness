from sqlalchemy.orm import Session

from app.modules.trainer_core.models import ProgressHistory, Routine, Session as TrainingSession


class TrainerSelectors:
    def __init__(self, db: Session) -> None:
        self.db = db

    def get_dashboard(self, user_id: str) -> dict[str, int]:
        routines = self.db.query(Routine).filter(Routine.user_id == user_id).count()
        sessions = self.db.query(TrainingSession).filter(TrainingSession.user_id == user_id).count()
        progress_entries = (
            self.db.query(ProgressHistory)
            .join(TrainingSession, ProgressHistory.session_id == TrainingSession.id)
            .filter(TrainingSession.user_id == user_id)
            .count()
        )
        return {
            "routines": routines,
            "sessions": sessions,
            "progress_entries": progress_entries,
        }
