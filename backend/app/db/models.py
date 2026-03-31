from datetime import date, datetime

from sqlalchemy import Date, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class District(Base):
    __tablename__ = "districts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_name: Mapped[str] = mapped_column(String(120), index=True)
    state_name: Mapped[str] = mapped_column(String(120))
    zone_type: Mapped[str] = mapped_column(String(50))
    area_type: Mapped[str] = mapped_column(String(50))
    latitude: Mapped[float] = mapped_column(Float)
    longitude: Mapped[float] = mapped_column(Float)
    baseline_water_level: Mapped[float] = mapped_column(Float)
    drainage_score: Mapped[float] = mapped_column(Float)
    sanitation_score: Mapped[float] = mapped_column(Float)
    population_total: Mapped[int] = mapped_column(Integer, default=0)
    population_density: Mapped[float] = mapped_column(Float, default=0)
    children_percent: Mapped[float] = mapped_column(Float, default=0)
    elderly_percent: Mapped[float] = mapped_column(Float, default=0)
    low_income_percent: Mapped[float] = mapped_column(Float, default=0)
    health_access_score: Mapped[float] = mapped_column(Float, default=0)
    vulnerability_index: Mapped[float] = mapped_column(Float, default=0)
    drinking_water_quality_score: Mapped[float] = mapped_column(Float, default=0)
    sanitation_risk_level: Mapped[str] = mapped_column(String(20), default="low")

    observations = relationship("Observation", back_populates="district", cascade="all, delete-orphan")
    predictions = relationship("Prediction", back_populates="district", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="district", cascade="all, delete-orphan")
    historical_alerts = relationship("HistoricalAlert", back_populates="district", cascade="all, delete-orphan")


class HistoricalAlert(Base):
    __tablename__ = "historical_alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    alert_date: Mapped[date] = mapped_column(Date)
    alert_type: Mapped[str] = mapped_column(String(80))
    severity: Mapped[str] = mapped_column(String(20))
    previous_risk_score: Mapped[float] = mapped_column(Float)
    previous_risk_level: Mapped[str] = mapped_column(String(20))
    cases_estimated: Mapped[int] = mapped_column(Integer)
    response_delay_hours: Mapped[float] = mapped_column(Float)
    anomaly_score: Mapped[float] = mapped_column(Float)
    alert_status: Mapped[str] = mapped_column(String(20))

    district = relationship("District", back_populates="historical_alerts")


class Observation(Base):
    __tablename__ = "observations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    observed_date: Mapped[date] = mapped_column(Date, index=True)
    baseline_water_level: Mapped[float] = mapped_column(Float)
    drainage_score: Mapped[float] = mapped_column(Float)
    sanitation_score: Mapped[float] = mapped_column(Float)
    population_density: Mapped[float] = mapped_column(Float)
    vulnerability_index: Mapped[float] = mapped_column(Float)
    anomaly_score: Mapped[float] = mapped_column(Float)
    previous_alerts_count: Mapped[int] = mapped_column(Integer, default=0)

    district = relationship("District", back_populates="observations")


class Prediction(Base):
    __tablename__ = "predictions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    observed_date: Mapped[date] = mapped_column(Date, index=True)
    score: Mapped[float] = mapped_column(Float, index=True)
    risk_level: Mapped[str] = mapped_column(String(20), index=True)
    explanation: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)

    district = relationship("District", back_populates="predictions")


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    title: Mapped[str] = mapped_column(String(180))
    message: Mapped[str] = mapped_column(Text)
    score: Mapped[float] = mapped_column(Float)
    severity: Mapped[str] = mapped_column(String(20))
    status: Mapped[str] = mapped_column(String(20), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    district = relationship("District", back_populates="alerts")


class Setting(Base):
    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    key: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    value: Mapped[str] = mapped_column(String(255))
