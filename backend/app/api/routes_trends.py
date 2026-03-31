from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.trends_service import build_trends

router = APIRouter()


@router.get("/trends")
def trends(
    district_id: int = Query(..., ge=1),
    days: int = Query(default=30, ge=1, le=365),
    db: Session = Depends(get_db),
):
    return build_trends(db, district_id, days)
