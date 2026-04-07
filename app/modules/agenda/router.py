from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user, get_db
from app.modules.agenda.repository import AgendaRepository
from app.modules.agenda.schemas import EventCreate, EventReschedule, EventResponse, EventStateChange
from app.modules.agenda.service import AgendaService

router = APIRouter(prefix="/agenda", tags=["agenda"])


@router.get("", response_model=list[EventResponse])
def list_events(
    db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return AgendaService(AgendaRepository(db)).list_events(user.id)


@router.post("", response_model=EventResponse)
def create_event(
    payload: EventCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return AgendaService(AgendaRepository(db)).create_event(user.id, payload)


@router.patch("/{event_id}/reschedule", response_model=EventResponse)
def reschedule_event(
    event_id: str,
    payload: EventReschedule,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return AgendaService(AgendaRepository(db)).reschedule_event(user.id, event_id, payload)


@router.patch("/{event_id}/status", response_model=EventResponse)
def update_event_status(
    event_id: str,
    payload: EventStateChange,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return AgendaService(AgendaRepository(db)).change_status(user.id, event_id, payload)
