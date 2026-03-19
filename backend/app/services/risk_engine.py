from app.core.constants import RISK_BANDS
from app.db.models import Observation, RiskPrediction
from sqlalchemy.orm import Session


def _risk_level(score: float) -> str:
    for level, (low, high) in RISK_BANDS.items():
        if low <= score <= high:
            return level
    return "critical"


def compute_risk_prediction(db: Session, district_id: int, observed_on) -> RiskPrediction:
    observation = (
        db.query(Observation)
        .filter(Observation.district_id == district_id, Observation.observed_on == observed_on)
        .first()
    )
    if not observation:
        raise ValueError("Observation not found")

    rainfall_score = min(observation.rainfall_mm / 1.5, 30)
    water_score = min(observation.water_level / 2.2, 30)
    fever_score = min(observation.fever_cases * 1.2, 25)
    contamination_score = min(observation.contamination_index * 20, 15)

    total_score = round(rainfall_score + water_score + fever_score + contamination_score, 1)
    confidence_score = round(min(0.55 + (observation.contamination_index * 0.25) + 0.15, 0.98), 2)
    level = _risk_level(total_score)

    factors = []
    if observation.rainfall_mm > 80:
        factors.append("Heavy rainfall accumulation")
    if observation.water_level > 70:
        factors.append("Elevated water level")
    if observation.fever_cases > 25:
        factors.append("Fever case spike")
    if observation.contamination_index > 0.6:
        factors.append("High contamination index")
    if not factors:
        factors.append("No major abnormal indicators detected")

    recommended_action = {
        "low": "Continue routine monitoring",
        "medium": "Increase district-level surveillance",
        "high": "Deploy rapid response team and validate field indicators",
        "critical": "Issue immediate public health advisory and emergency intervention",
    }[level]

    prediction = RiskPrediction(
        district_id=district_id,
        predicted_on=observed_on,
        risk_score=total_score,
        risk_level=level,
        confidence_score=confidence_score,
        contributing_factors=" | ".join(factors),
        recommended_action=recommended_action,
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)
    return prediction
