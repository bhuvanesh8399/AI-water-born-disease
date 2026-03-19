from sqlalchemy.orm import Session

from app.db.models import District, RiskPrediction


def build_trends(db: Session, district_code: str, days: int) -> dict:
    district = db.query(District).filter(District.code == district_code).first()
    if not district:
        return {"district_code": district_code, "district_name": "Unknown", "points": [], "summary": "District not found"}

    predictions = (
        db.query(RiskPrediction)
        .filter(RiskPrediction.district_id == district.id)
        .order_by(RiskPrediction.predicted_on.asc())
        .all()
    )[-days:]

    summary = "Risk trend is stable."
    if len(predictions) >= 2 and predictions[-1].risk_score > predictions[0].risk_score:
        summary = "Risk is trending upward and needs closer monitoring."

    return {
        "district_code": district.code,
        "district_name": district.name,
        "points": [
            {
                "date": item.predicted_on.isoformat(),
                "risk_score": item.risk_score,
                "risk_level": item.risk_level,
                "confidence_score": item.confidence_score,
            }
            for item in predictions
        ],
        "summary": summary,
    }
