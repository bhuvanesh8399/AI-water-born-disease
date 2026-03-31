from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.models import District, Prediction
from app.db.session import get_db

router = APIRouter()


@router.get("/health")
def health_check(db: Session = Depends(get_db)) -> dict:
    return {
        "status": "ok",
        "district_count": db.query(District).count(),
        "prediction_count": db.query(Prediction).count(),
    }
