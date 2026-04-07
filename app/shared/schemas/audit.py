from datetime import datetime

from pydantic import BaseModel


class AuditLog(BaseModel):
    action: str
    resource: str
    actor_id: str | None = None
    timestamp: datetime | None = None
