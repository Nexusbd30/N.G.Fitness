from app.db.base import Base
from app.db.session import engine
from app.modules.agenda import models as agenda_models
from app.modules.auth import models as auth_models
from app.modules.notifications import models as notifications_models
from app.modules.trainer_core import models as trainer_models


def init_db() -> None:
    _ = (agenda_models, auth_models, notifications_models, trainer_models)
    Base.metadata.create_all(bind=engine)
