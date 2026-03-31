from datetime import datetime

from sqlalchemy.orm import Session

from app.db.models import Alert, Prediction


def regenerate_current_alerts(db: Session) -> None:
    db.query(Alert).delete()
    predictions = (
        db.query(Prediction)
        .filter(Prediction.risk_level == "high")
        .order_by(Prediction.score.desc())
        .all()
    )
    for prediction in predictions:
        district = prediction.district
        db.add(
            Alert(
                district_id=district.id,
                title=f"High risk in {district.district_name}",
                message=prediction.explanation,
                score=prediction.score,
                severity="high",
                status="active",
                created_at=datetime.utcnow(),
            )
        )
    db.commit()
