import csv
from collections import defaultdict
from pathlib import Path

from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.db.models import Alert, District, HistoricalAlert, Observation, Prediction, Setting
from app.services.alert_engine import regenerate_current_alerts
from app.services.risk_engine import RiskInputs, compute_risk
from app.utils.dates import parse_date

settings = get_settings()


def _csv_rows(filename: str) -> list[dict[str, str]]:
    path = Path(settings.project_root, filename)
    with path.open("r", encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def reload_dataset(db: Session) -> dict[str, int]:
    db.query(Alert).delete()
    db.query(Prediction).delete()
    db.query(Observation).delete()
    db.query(HistoricalAlert).delete()
    db.query(District).delete()
    db.query(Setting).delete()
    db.commit()

    master_rows = _csv_rows("district_master.csv")
    profile_rows = {int(row["district_id"]): row for row in _csv_rows("district_profile.csv")}
    historical_rows = _csv_rows("historical_alerts.csv")
    observation_rows = _csv_rows("observations_base.csv")

    districts: dict[int, District] = {}
    for row in master_rows:
        district_id = int(row["district_id"])
        profile = profile_rows[district_id]
        district = District(
            id=district_id,
            district_name=row["district_name"],
            state_name=row["state_name"],
            zone_type=row["zone_type"],
            area_type=row["area_type"],
            latitude=float(row["latitude"]),
            longitude=float(row["longitude"]),
            baseline_water_level=float(row["baseline_water_level"]),
            drainage_score=float(row["drainage_score"]),
            sanitation_score=float(row["sanitation_score"]),
            population_total=int(profile["population_total"]),
            population_density=float(profile["population_density"]),
            children_percent=float(profile["children_percent"]),
            elderly_percent=float(profile["elderly_percent"]),
            low_income_percent=float(profile["low_income_percent"]),
            health_access_score=float(profile["health_access_score"]),
            vulnerability_index=float(profile["vulnerability_index"]),
            drinking_water_quality_score=float(profile["drinking_water_quality_score"]),
            sanitation_risk_level=profile["sanitation_risk_level"],
        )
        districts[district_id] = district
        db.add(district)
    db.flush()

    historical_counts: dict[int, int] = defaultdict(int)
    for row in historical_rows:
        district_id = int(row["district_id"])
        historical_counts[district_id] += 1
        db.add(
            HistoricalAlert(
                id=int(row["alert_id"]),
                district_id=district_id,
                alert_date=parse_date(row["alert_date"]),
                alert_type=row["alert_type"],
                severity=row["severity"],
                previous_risk_score=float(row["previous_risk_score"]),
                previous_risk_level=row["previous_risk_level"],
                cases_estimated=int(row["cases_estimated"]),
                response_delay_hours=float(row["response_delay_hours"]),
                anomaly_score=float(row["anomaly_score"]),
                alert_status=row["alert_status"],
            )
        )
    db.flush()

    latest_by_district: dict[int, Observation] = {}
    for row in observation_rows:
        district_id = int(row["district_id"])
        observation = Observation(
            id=int(row["observation_id"]),
            district_id=district_id,
            observed_date=parse_date(row["observed_date"]),
            baseline_water_level=float(row["baseline_water_level"]),
            drainage_score=float(row["drainage_score"]),
            sanitation_score=float(row["sanitation_score"]),
            population_density=float(row["population_density"]),
            vulnerability_index=float(row["vulnerability_index"]),
            anomaly_score=float(row["anomaly_score"]),
            previous_alerts_count=int(row["previous_alerts_count"]),
        )
        db.add(observation)
        current = latest_by_district.get(district_id)
        if current is None or observation.observed_date > current.observed_date:
            latest_by_district[district_id] = observation
    db.flush()

    for district_id, observation in latest_by_district.items():
        district = districts[district_id]
        previous_alerts_count = max(observation.previous_alerts_count, historical_counts[district_id])
        result = compute_risk(
            RiskInputs(
                baseline_water_level=observation.baseline_water_level,
                drainage_score=observation.drainage_score,
                sanitation_score=observation.sanitation_score,
                vulnerability_index=district.vulnerability_index,
                population_density=observation.population_density,
                anomaly_score=observation.anomaly_score,
                previous_alerts_count=previous_alerts_count,
                low_income_percent=district.low_income_percent,
                health_access_score=district.health_access_score,
                drinking_water_quality_score=district.drinking_water_quality_score,
            )
        )
        db.add(
            Prediction(
                district_id=district_id,
                observed_date=observation.observed_date,
                score=result.score,
                risk_level=result.risk_level,
                explanation=result.explanation,
            )
        )
    db.flush()

    db.add_all(
        [
            Setting(key="auth_enabled", value=str(settings.auth_enabled).lower()),
            Setting(key="read_only_demo", value=str(settings.read_only_demo).lower()),
            Setting(key="district_count", value=str(len(master_rows))),
            Setting(key="historical_alert_rows", value=str(len(historical_rows))),
        ]
    )
    db.commit()
    regenerate_current_alerts(db)

    return {
        "districts": len(master_rows),
        "historical_alerts": len(historical_rows),
        "observations": len(observation_rows),
        "predictions": len(latest_by_district),
    }


def bootstrap_database(db: Session) -> dict[str, int]:
    return reload_dataset(db)
