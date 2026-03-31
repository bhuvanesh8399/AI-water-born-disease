from sqlalchemy.orm import Session

from app.db.models import District, Observation
from app.services.risk_engine import RiskInputs, compute_risk


def build_trends(db: Session, district_id: int, days: int) -> dict:
    district = db.get(District, district_id)
    if district is None:
        return {"district_id": district_id, "district_name": "Unknown", "points": []}

    observations = (
        db.query(Observation)
        .filter(Observation.district_id == district_id)
        .order_by(Observation.observed_date.desc())
        .limit(days)
        .all()
    )
    points = []
    for item in reversed(observations):
        result = compute_risk(
            RiskInputs(
                baseline_water_level=item.baseline_water_level,
                drainage_score=item.drainage_score,
                sanitation_score=item.sanitation_score,
                vulnerability_index=district.vulnerability_index,
                population_density=item.population_density,
                anomaly_score=item.anomaly_score,
                previous_alerts_count=item.previous_alerts_count,
                low_income_percent=district.low_income_percent,
                health_access_score=district.health_access_score,
                drinking_water_quality_score=district.drinking_water_quality_score,
            )
        )
        points.append(
            {
                "date": item.observed_date.isoformat(),
                "score": result.score,
                "risk_level": result.risk_level,
            }
        )
    return {
        "district_id": district.id,
        "district_name": district.district_name,
        "points": points,
    }
