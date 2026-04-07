from datetime import datetime

from pydantic import BaseModel


class EventCreate(BaseModel):
    type: str
    title: str
    start_at: datetime
    end_at: datetime


class EventReschedule(BaseModel):
    start_at: datetime
    end_at: datetime
    reason: str | None = None


class EventStateChange(BaseModel):
    status: str
    reason: str | None = None


class EventResponse(BaseModel):
    id: str
    user_id: str
    type: str
    title: str
    start_at: datetime
    end_at: datetime
    status: str

    model_config = {"from_attributes": True}
