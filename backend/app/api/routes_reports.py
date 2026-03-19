from fastapi import APIRouter, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.db.models import User
from app.db.session import get_db
from app.services.dashboard_service import get_current_user
from app.services.report_service import alerts_csv_report, alerts_pdf_report

router = APIRouter()


@router.get("/reports/alerts.csv")
def report_alerts_csv(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    data = alerts_csv_report(db)
    return Response(
        content=data,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=alerts-report.csv"},
    )


@router.get("/reports/alerts.pdf")
def report_alerts_pdf(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
):
    data = alerts_pdf_report(db)
    return Response(
        content=data,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=alerts-report.pdf"},
    )
