from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.dashboard_service import build_dashboard_summary
from app.services.heatmap_service import build_heatmap

router = APIRouter()


@router.get("/dashboard/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    return build_dashboard_summary(db)


@router.get("/hotspots")
def hotspots(db: Session = Depends(get_db)):
    return build_dashboard_summary(db)["hotspots"]


@router.get("/heatmap")
def heatmap(db: Session = Depends(get_db)):
    return build_heatmap(db)
