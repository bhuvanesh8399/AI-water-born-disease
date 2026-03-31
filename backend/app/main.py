from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_alerts import router as alerts_router
from app.api.routes_auth import router as auth_router
from app.api.routes_dashboard import router as dashboard_router
from app.api.routes_health import router as health_router
from app.api.routes_ingest import router as ingest_router
from app.api.routes_settings import router as settings_router
from app.api.routes_trends import router as trends_router
from app.core.config import get_settings
from app.core.logging import configure_logging
from app.db.base import Base
from app.db.models import Alert, District, HistoricalAlert, Observation, Prediction, Setting  # noqa: F401
from app.db.session import SessionLocal, engine
from app.services.ingest_service import bootstrap_database

configure_logging()
settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        bootstrap_database(db)
    finally:
        db.close()
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(health_router, prefix="/api", tags=["health"])
app.include_router(dashboard_router, prefix="/api", tags=["dashboard"])
app.include_router(trends_router, prefix="/api", tags=["trends"])
app.include_router(alerts_router, prefix="/api", tags=["alerts"])
app.include_router(settings_router, prefix="/api", tags=["settings"])
app.include_router(ingest_router, prefix="/api", tags=["ingest"])


@app.get("/")
def root() -> dict:
    return {
        "app": settings.app_name,
        "status": "running",
        "api_base": "/api",
        "docs": "/docs",
    }
