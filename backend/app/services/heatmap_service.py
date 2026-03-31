from sqlalchemy.orm import Session

from app.db.models import Prediction


def build_heatmap(db: Session) -> list[dict]:
    predictions = (
        db.query(Prediction)
        .order_by(Prediction.score.desc(), Prediction.district_id.asc())
        .all()
    )
    return [
        {
            "district_id": item.district_id,
            "district_name": item.district.district_name,
            "state_name": item.district.state_name,
            "zone_type": item.district.zone_type,
            "latitude": item.district.latitude,
            "longitude": item.district.longitude,
            "score": item.score,
            "risk_level": item.risk_level,
        }
        for item in predictions
    ]
