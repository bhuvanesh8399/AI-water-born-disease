from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.models import User
from app.db.session import get_db
from app.schemas.settings import SettingsResponse, SettingsUpdateRequest
from app.services.dashboard_service import get_current_user
from app.services.settings_service import get_settings_map, update_settings_map

router = APIRouter()


@router.get("/settings", response_model=SettingsResponse)
def get_settings_route(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    return {"values": get_settings_map(db)}


@router.put("/settings", response_model=SettingsResponse)
def update_settings_route(
    payload: SettingsUpdateRequest,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can update settings")
    values = update_settings_map(db, payload.values)
    return {"values": values}
