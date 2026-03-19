from sqlalchemy.orm import Session

from app.db.models import Setting


def get_settings_map(db: Session) -> dict[str, str]:
    rows = db.query(Setting).all()
    return {row.key: row.value for row in rows}


def update_settings_map(db: Session, values: dict[str, str]) -> dict[str, str]:
    current = {row.key: row for row in db.query(Setting).all()}
    for key, value in values.items():
        row = current.get(key)
        if row:
            row.value = value
        else:
            db.add(Setting(key=key, value=value))
    db.commit()
    return get_settings_map(db)
