def validate_progressive_overload(previous_load: float, next_load: float) -> None:
    if previous_load <= 0:
        return
    if next_load > previous_load * 1.10:
        raise ValueError("Load increase exceeds 10 percent weekly rule")


def validate_rest_window(hours_since_last_session: int) -> None:
    if hours_since_last_session < 24:
        raise ValueError("Minimum rest period not satisfied")


def validate_rpe_limit(rpe: float, max_rpe: float) -> None:
    if rpe > max_rpe:
        raise ValueError("RPE exceeds configured profile limit")
