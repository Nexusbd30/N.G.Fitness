from app.modules.notifications.schemas import NotificationDTO


class NotificationService:
    def send_reminder(self, payload: NotificationDTO) -> dict[str, str]:
        return {"status": "stub", "message": payload.message}

    def send_cancellation(self, payload: NotificationDTO) -> dict[str, str]:
        return {"status": "stub", "message": payload.message}
