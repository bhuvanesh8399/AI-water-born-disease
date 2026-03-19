from datetime import datetime, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.db.models import Alert, District, RiskPrediction, User
from app.db.session import get_db

bearer_scheme = HTTPBearer(auto_error=False)


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    try:
        payload = decode_access_token(credentials.credentials)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

    email = payload.get("sub")
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user


def build_dashboard_summary(db: Session) -> dict:
    latest_predictions = (
        db.query(RiskPrediction)
        .order_by(RiskPrediction.predicted_on.desc())
        .all()
    )

    latest_by_district: dict[int, RiskPrediction] = {}
    for prediction in latest_predictions:
        latest_by_district.setdefault(prediction.district_id, prediction)

    predictions = list(latest_by_district.values())
    alert_count = db.query(Alert).filter(Alert.status != "resolved").count()
    high_risk_count = sum(1 for p in predictions if p.risk_level in {"high", "critical"})
    avg_risk = round(sum(p.risk_score for p in predictions) / len(predictions), 1) if predictions else 0.0

    hotspots = []
    for prediction in sorted(predictions, key=lambda item: item.risk_score, reverse=True)[:4]:
        district = db.get(District, prediction.district_id)
        hotspots.append(
            {
                "district_code": district.code,
                "district_name": district.name,
                "risk_score": prediction.risk_score,
                "risk_level": prediction.risk_level,
            }
        )

    recent_alerts = (
        db.query(Alert)
        .order_by(Alert.created_at.desc())
        .limit(5)
        .all()
    )

    factors = []
    for prediction in predictions[:3]:
        factors.extend(prediction.contributing_factors.split(" | "))

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "kpis": [
            {"label": "Active alerts", "value": str(alert_count), "trend": "+2 since yesterday"},
            {"label": "High-risk districts", "value": str(high_risk_count), "trend": "Stable"},
            {"label": "Average risk", "value": f"{avg_risk}", "trend": "+4.3%"},
        ],
        "top_hotspots": hotspots,
        "recent_alerts": [
            {
                "id": alert.id,
                "title": alert.title,
                "severity": alert.severity,
                "status": alert.status,
                "district_code": db.get(District, alert.district_id).code,
                "created_at": alert.created_at.isoformat(),
            }
            for alert in recent_alerts
        ],
        "decision_summary": (
            "The system is flagging elevated multi-factor risk in coastal and dense urban districts. "
            "Field verification and public health readiness should be prioritized."
        ),
        "contributing_factors": factors[:6],
    }
