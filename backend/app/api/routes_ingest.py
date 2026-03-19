from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.db.models import User
from app.db.session import get_db
from app.schemas.common import MessageResponse
from app.services.dashboard_service import get_current_user
from app.services.ingest_service import ingest_csv_bytes

router = APIRouter()


@router.post("/ingest/observations/csv", response_model=MessageResponse)
async def ingest_observations_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    if user.role not in {"admin", "analyst"}:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    content = await file.read()
    count = ingest_csv_bytes(db, content)
    return {"message": f"Imported {count} rows successfully"}
