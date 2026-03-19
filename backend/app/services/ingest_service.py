import csv
from datetime import datetime
from io import StringIO

from sqlalchemy.orm import Session

from app.db.models import District, Observation
from app.services.alert_engine import maybe_create_alerts
from app.services.risk_engine import compute_risk_prediction


def ingest_csv_bytes(db: Session, content: bytes) -> int:
    text = content.decode("utf-8")
    reader = csv.DictReader(StringIO(text))
    count = 0

    for row in reader:
        district = db.query(District).filter(District.code == row["district_code"]).first()
        if not district:
            continue

        observed_on = datetime.strptime(row["observed_on"], "%Y-%m-%d").date()
        existing = (
            db.query(Observation)
            .filter(Observation.district_id == district.id, Observation.observed_on == observed_on)
            .first()
        )
        if existing:
            existing.rainfall_mm = float(row["rainfall_mm"])
            existing.water_level = float(row["water_level"])
            existing.fever_cases = int(row["fever_cases"])
            existing.contamination_index = float(row["contamination_index"])
            existing.source = "csv_upload"
        else:
            db.add(
                Observation(
                    district_id=district.id,
                    observed_on=observed_on,
                    rainfall_mm=float(row["rainfall_mm"]),
                    water_level=float(row["water_level"]),
                    fever_cases=int(row["fever_cases"]),
                    contamination_index=float(row["contamination_index"]),
                    source="csv_upload",
                )
            )
        db.commit()

        prediction = compute_risk_prediction(db, district.id, observed_on)
        maybe_create_alerts(db, district.id, prediction)
        count += 1

    return count
