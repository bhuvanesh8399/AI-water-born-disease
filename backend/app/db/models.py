from datetime import datetime

from sqlalchemy import Date, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(50), default="analyst")
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class District(Base):
    __tablename__ = "districts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    code: Mapped[str] = mapped_column(String(16), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    state: Mapped[str] = mapped_column(String(120), default="Tamil Nadu")
    latitude: Mapped[float] = mapped_column(Float)
    longitude: Mapped[float] = mapped_column(Float)

    observations = relationship("Observation", back_populates="district", cascade="all, delete-orphan")
    predictions = relationship("RiskPrediction", back_populates="district", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="district", cascade="all, delete-orphan")


class Observation(Base):
    __tablename__ = "observations"
    __table_args__ = (UniqueConstraint("district_id", "observed_on", name="uq_observation_day"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    observed_on: Mapped[datetime] = mapped_column(Date)
    rainfall_mm: Mapped[float] = mapped_column(Float, default=0)
    water_level: Mapped[float] = mapped_column(Float, default=0)
    fever_cases: Mapped[int] = mapped_column(Integer, default=0)
    contamination_index: Mapped[float] = mapped_column(Float, default=0)
    source: Mapped[str] = mapped_column(String(120), default="seed")

    district = relationship("District", back_populates="observations")


class RiskPrediction(Base):
    __tablename__ = "risk_predictions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    predicted_on: Mapped[datetime] = mapped_column(Date)
    risk_score: Mapped[float] = mapped_column(Float)
    risk_level: Mapped[str] = mapped_column(String(50))
    confidence_score: Mapped[float] = mapped_column(Float)
    contributing_factors: Mapped[str] = mapped_column(Text)
    recommended_action: Mapped[str] = mapped_column(Text)

    district = relationship("District", back_populates="predictions")


class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"), index=True)
    title: Mapped[str] = mapped_column(String(255))
    message: Mapped[str] = mapped_column(Text)
    severity: Mapped[str] = mapped_column(String(50), default="medium")
    status: Mapped[str] = mapped_column(String(50), default="new")
    source: Mapped[str] = mapped_column(String(120), default="risk_engine")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    district = relationship("District", back_populates="alerts")


class Setting(Base):
    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    key: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    value: Mapped[str] = mapped_column(String(500))
