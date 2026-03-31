from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_write_access
from app.db.models import Alert
from app.db.session import get_db

router = APIRouter()


@router.get("/alerts")
def list_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(Alert.score.desc(), Alert.created_at.desc()).all()
    return [
        {
            "id": item.id,
            "district_id": item.district_id,
            "district_name": item.district.district_name,
            "title": item.title,
            "message": item.message,
            "score": item.score,
            "severity": item.severity,
            "status": item.status,
            "created_at": item.created_at.isoformat(),
        }
        for item in alerts
    ]


@router.patch("/alerts/{alert_id}")
def update_alert(alert_id: int, _: dict = Depends(require_write_access)):
    return {"detail": f"Alert {alert_id} updated"}
