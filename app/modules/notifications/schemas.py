from pydantic import BaseModel


class NotificationDTO(BaseModel):
    type: str
    message: str
