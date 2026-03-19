from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes_alerts import router as alerts_router
from app.api.routes_auth import router as auth_router
from app.api.routes_dashboard import router as dashboard_router
from app.api.routes_health import router as health_router
from app.api.routes_heatmap import router as heatmap_router
from app.api.routes_ingest import router as ingest_router
from app.api.routes_reports import router as reports_router
from app.api.routes_settings import router as settings_router
from app.api.routes_trends import router as trends_router
from app.core.config import get_settings
from app.core.logging import configure_logging
from app.db.base import Base
from app.db.seed import seed_database
from app.db.session import SessionLocal, engine

configure_logging()
settings = get_settings()

app = FastAPI(title=settings.app_name)
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
app.include_router(heatmap_router, prefix="/api", tags=["heatmap"])
app.include_router(trends_router, prefix="/api", tags=["trends"])
app.include_router(alerts_router, prefix="/api", tags=["alerts"])
app.include_router(settings_router, prefix="/api", tags=["settings"])
app.include_router(ingest_router, prefix="/api", tags=["ingest"])
app.include_router(reports_router, prefix="/api", tags=["reports"])


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
