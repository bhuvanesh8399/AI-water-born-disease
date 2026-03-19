from datetime import datetime

from sqlalchemy.orm import Session

from app.db.models import Alert, RiskPrediction


def maybe_create_alerts(db: Session, district_id: int, prediction: RiskPrediction) -> None:
    if prediction.risk_level not in {"high", "critical"}:
        return

    existing = (
        db.query(Alert)
        .filter(Alert.district_id == district_id)
        .order_by(Alert.created_at.desc())
        .first()
    )

    if existing and existing.title == f"{prediction.risk_level.title()} risk detected":
        return

    alert = Alert(
        district_id=district_id,
        title=f"{prediction.risk_level.title()} risk detected",
        message=(
            f"Risk score {prediction.risk_score:.0f} with confidence {prediction.confidence_score:.2f}. "
            f"Recommended action: {prediction.recommended_action}"
        ),
        severity=prediction.risk_level,
        status="new",
        source="risk_engine",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )
    db.add(alert)
    db.commit()
