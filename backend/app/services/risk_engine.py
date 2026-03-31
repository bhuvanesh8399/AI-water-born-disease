from dataclasses import dataclass

from app.core.constants import LOW_RISK_THRESHOLD, MEDIUM_RISK_THRESHOLD


@dataclass
class RiskInputs:
    baseline_water_level: float
    drainage_score: float
    sanitation_score: float
    vulnerability_index: float
    population_density: float
    anomaly_score: float
    previous_alerts_count: int
    low_income_percent: float
    health_access_score: float
    drinking_water_quality_score: float


@dataclass
class RiskResult:
    score: float
    risk_level: str
    explanation: str


def _clamp(value: float, upper: float) -> float:
    return max(0.0, min(value / upper, 1.0))


def compute_risk(inputs: RiskInputs) -> RiskResult:
    score = round(
        (_clamp(inputs.baseline_water_level, 5.0) * 0.12)
        + ((1 - _clamp(inputs.drainage_score, 100.0)) * 0.10)
        + ((1 - _clamp(inputs.sanitation_score, 100.0)) * 0.10)
        + (_clamp(inputs.vulnerability_index, 1.0) * 0.14)
        + (_clamp(inputs.population_density, 10000.0) * 0.10)
        + (_clamp(inputs.anomaly_score, 1.0) * 0.14)
        + (_clamp(float(inputs.previous_alerts_count), 20.0) * 0.08)
        + (_clamp(inputs.low_income_percent, 100.0) * 0.08)
        + ((1 - _clamp(inputs.health_access_score, 100.0)) * 0.07)
        + ((1 - _clamp(inputs.drinking_water_quality_score, 100.0)) * 0.07),
        3,
    )

    if score < LOW_RISK_THRESHOLD:
        risk_level = "low"
    elif score < MEDIUM_RISK_THRESHOLD:
        risk_level = "medium"
    else:
        risk_level = "high"

    explanation = (
        f"Score {score:.3f} driven by water level {inputs.baseline_water_level:.2f}, "
        f"anomaly {inputs.anomaly_score:.3f}, vulnerability {inputs.vulnerability_index:.3f}, "
        f"and prior alerts {inputs.previous_alerts_count}."
    )
    return RiskResult(score=score, risk_level=risk_level, explanation=explanation)
