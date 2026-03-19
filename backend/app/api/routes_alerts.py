from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.constants import ALERT_STATUS
from app.db.models import Alert, User
from app.db.session import get_db
from app.schemas.alerts import AlertListResponse, AlertOut, AlertUpdateRequest
from app.services.dashboard_service import get_current_user

router = APIRouter()


@router.get("/alerts", response_model=AlertListResponse)
def list_alerts(
    status: str | None = Query(default=None),
    severity: str | None = Query(default=None),
    district: str | None = Query(default=None),
    limit: int = Query(default=50, le=200),
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    query = db.query(Alert)
    if status:
        query = query.filter(Alert.status == status)
    if severity:
        query = query.filter(Alert.severity == severity)
    if district:
        query = query.join(Alert.district).filter_by(code=district)

    items = query.order_by(Alert.created_at.desc()).limit(limit).all()
    return {"items": [AlertOut.model_validate(item) for item in items], "total": len(items)}


@router.patch("/alerts/{alert_id}", response_model=AlertOut)
def update_alert(
    alert_id: int,
    payload: AlertUpdateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role not in {"admin", "analyst"}:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    if payload.status not in ALERT_STATUS:
        raise HTTPException(status_code=400, detail="Invalid status")

    alert = db.get(Alert, alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")

    alert.status = payload.status
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return AlertOut.model_validate(alert)
