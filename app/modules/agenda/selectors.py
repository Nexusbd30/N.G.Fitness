from sqlalchemy.orm import Session

from app.modules.agenda.models import Event


class AgendaSelectors:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_by_range(self, user_id: str) -> list[Event]:
        return self.db.query(Event).filter(Event.user_id == user_id).all()
