from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.models import User
from app.db.session import get_db
from app.schemas.heatmap import HeatmapResponse
from app.services.dashboard_service import get_current_user
from app.services.heatmap_service import build_heatmap

router = APIRouter()


@router.get("/heatmap", response_model=HeatmapResponse)
def heatmap(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return build_heatmap(db)
