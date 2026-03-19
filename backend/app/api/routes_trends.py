from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.models import User
from app.db.session import get_db
from app.schemas.trends import TrendsResponse
from app.services.dashboard_service import get_current_user
from app.services.trends_service import build_trends

router = APIRouter()


@router.get("/trends", response_model=TrendsResponse)
def trends(
    district: str = Query(...),
    days: int = Query(default=14, ge=3, le=30),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return build_trends(db, district, days)
