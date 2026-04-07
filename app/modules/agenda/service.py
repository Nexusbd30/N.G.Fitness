from app.modules.agenda.models import Event, EventHistory
from app.modules.agenda.repository import AgendaRepository
from app.modules.agenda.rules import validate_event_window
from app.modules.agenda.schemas import EventCreate, EventReschedule, EventStateChange
from app.shared.exceptions import DomainError
from app.shared.utils import utc_now


class AgendaService:
    def __init__(self, repository: AgendaRepository) -> None:
        self.repository = repository

    def list_events(self, user_id: str):
        return self.repository.list_events(user_id)

    def create_event(self, user_id: str, payload: EventCreate) -> Event:
        validate_event_window(payload.start_at, payload.end_at)
        event = Event(
            user_id=user_id,
            type=payload.type,
            title=payload.title,
            start_at=payload.start_at,
            end_at=payload.end_at,
        )
        event = self.repository.create_event(event)
        self.repository.add_history(
            EventHistory(
                event_id=event.id,
                previous_status=None,
                new_status=event.status,
                reason="created",
                created_at=utc_now(),
            )
        )
        return event

    def reschedule_event(self, user_id: str, event_id: str, payload: EventReschedule) -> Event:
        validate_event_window(payload.start_at, payload.end_at)
        event = self.repository.get_event(event_id, user_id)
        if not event:
            raise DomainError("Event not found", status_code=404)

        event.start_at = payload.start_at
        event.end_at = payload.end_at
        event = self.repository.save_event(event)
        self.repository.add_history(
            EventHistory(
                event_id=event.id,
                previous_status=event.status,
                new_status=event.status,
                reason=payload.reason or "rescheduled",
                created_at=utc_now(),
            )
        )
        return event

    def change_status(self, user_id: str, event_id: str, payload: EventStateChange) -> Event:
        event = self.repository.get_event(event_id, user_id)
        if not event:
            raise DomainError("Event not found", status_code=404)

        previous_status = event.status
        event.status = payload.status
        event = self.repository.save_event(event)
        self.repository.add_history(
            EventHistory(
                event_id=event.id,
                previous_status=previous_status,
                new_status=payload.status,
                reason=payload.reason or "status_changed",
                created_at=utc_now(),
            )
        )
        return event
