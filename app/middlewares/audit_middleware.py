import logging

from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("ngf.audit")


class AuditMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):  # type: ignore[no-untyped-def]
        response = await call_next(request)
        logger.info("%s %s -> %s", request.method, request.url.path, response.status_code)
        return response
