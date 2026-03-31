from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.security import require_write_access
from app.db.session import get_db
from app.services.settings_service import get_settings_map

router = APIRouter()


@router.get("/settings")
def read_settings(db: Session = Depends(get_db)):
    return {"values": get_settings_map(db)}


@router.put("/settings")
def update_settings(_: dict = Depends(require_write_access)):
    return {"detail": "Settings updated"}
