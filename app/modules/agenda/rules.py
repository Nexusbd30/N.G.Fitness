def validate_event_window(start_at, end_at) -> None:  # type: ignore[no-untyped-def]
    if end_at <= start_at:
        raise ValueError("Event end date must be after start date")


def validate_status_transition(current_status: str, next_status: str) -> None:
    allowed = {
        "scheduled": {"rescheduled", "cancelled", "completed"},
        "rescheduled": {"cancelled", "completed"},
        "completed": set(),
        "cancelled": set(),
    }
    if next_status not in allowed.get(current_status, set()):
        raise ValueError("Invalid agenda status transition")
