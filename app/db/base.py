from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, with_loader_criteria


class Base(DeclarativeBase):
    pass


class SoftDeleteMixin:
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)


def soft_delete_criteria(entity) -> bool:  # type: ignore[no-untyped-def]
    return entity.deleted_at.is_(None)


SOFT_DELETE_OPTION = with_loader_criteria(SoftDeleteMixin, soft_delete_criteria, include_aliases=True)
