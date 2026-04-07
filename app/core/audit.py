from app.shared.schemas.audit import AuditLog


def build_audit_log(action: str, resource: str, actor_id: str | None = None) -> AuditLog:
    return AuditLog(action=action, resource=resource, actor_id=actor_id)
