from sqlalchemy.orm import Session

from app.modules.agenda.models import Event
from app.modules.auth.models import User
from app.modules.trainer_core.models import Goal, Routine, Session as TrainingSession


class CoachSelectors:
    def __init__(self, db: Session) -> None:
        self.db = db

    def dashboard(self) -> dict[str, int]:
        athlete_ids_query = self.db.query(User.id).filter(User.role == "athlete")
        athlete_ids = [row[0] for row in athlete_ids_query.all()]

        if not athlete_ids:
            return {
                "athletes": 0,
                "routines": 0,
                "sessions": 0,
                "events": 0,
                "active_goals": 0,
            }

        return {
            "athletes": len(athlete_ids),
            "routines": self.db.query(Routine).filter(Routine.user_id.in_(athlete_ids)).count(),
            "sessions": self.db.query(TrainingSession).filter(TrainingSession.user_id.in_(athlete_ids)).count(),
            "events": self.db.query(Event).filter(Event.user_id.in_(athlete_ids)).count(),
            "active_goals": self.db.query(Goal).filter(Goal.user_id.in_(athlete_ids), Goal.active.is_(True)).count(),
        }

    def athletes(self) -> list[dict[str, int | str | None]]:
        athletes = self.db.query(User).filter(User.role == "athlete").order_by(User.created_at.desc()).all()
        items: list[dict[str, int | str | None]] = []
        for athlete in athletes:
            items.append(
                {
                    "id": athlete.id,
                    "email": athlete.email,
                    "full_name": athlete.full_name,
                    "routines": self.db.query(Routine).filter(Routine.user_id == athlete.id).count(),
                    "sessions": self.db.query(TrainingSession).filter(TrainingSession.user_id == athlete.id).count(),
                    "goals": self.db.query(Goal).filter(Goal.user_id == athlete.id, Goal.active.is_(True)).count(),
                }
            )
        return items
