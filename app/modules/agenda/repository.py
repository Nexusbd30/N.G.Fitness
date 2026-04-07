from sqlalchemy.orm import Session

from app.modules.agenda.models import Event, EventHistory


class AgendaRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_events(self, user_id: str) -> list[Event]:
        return self.db.query(Event).filter(Event.user_id == user_id).all()

    def create_event(self, event: Event) -> Event:
        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)
        return event

    def get_event(self, event_id: str, user_id: str) -> Event | None:
        return (
            self.db.query(Event)
            .filter(Event.id == event_id, Event.user_id == user_id)
            .first()
        )

    def save_event(self, event: Event) -> Event:
        self.db.add(event)
        self.db.commit()
        self.db.refresh(event)
        return event

    def add_history(self, history: EventHistory) -> EventHistory:
        self.db.add(history)
        self.db.commit()
        self.db.refresh(history)
        return history
