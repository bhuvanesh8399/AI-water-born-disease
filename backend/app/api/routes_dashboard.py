from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.models import User
from app.db.session import get_db
from app.schemas.dashboard import DashboardSummaryResponse
from app.services.dashboard_service import build_dashboard_summary, get_current_user

router = APIRouter()


@router.get("/dashboard/summary", response_model=DashboardSummaryResponse)
def dashboard_summary(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return build_dashboard_summary(db)
