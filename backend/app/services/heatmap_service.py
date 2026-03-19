from sqlalchemy.orm import Session

from app.db.models import District, RiskPrediction


def build_heatmap(db: Session) -> dict:
    latest_predictions = (
        db.query(RiskPrediction)
        .order_by(RiskPrediction.predicted_on.desc())
        .all()
    )
    latest_by_district: dict[int, RiskPrediction] = {}
    for item in latest_predictions:
        latest_by_district.setdefault(item.district_id, item)

    items = []
    for district_id, prediction in latest_by_district.items():
        district = db.get(District, district_id)
        items.append(
            {
                "district_code": district.code,
                "district_name": district.name,
                "latitude": district.latitude,
                "longitude": district.longitude,
                "risk_score": prediction.risk_score,
                "risk_level": prediction.risk_level,
                "confidence_score": prediction.confidence_score,
            }
        )
    return {"items": items}
