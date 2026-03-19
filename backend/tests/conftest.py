import os
import sys
from pathlib import Path
from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.append(str(ROOT_DIR))

os.environ["DATABASE_URL"] = "sqlite:///./test_ews.db"

from app.db.base import Base
from app.db.seed import seed_database
from app.db.session import get_db
from app.main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_ews.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_database(db)
    db.close()


def override_get_db() -> Generator:
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture()
def client():
    return TestClient(app)


@pytest.fixture()
def auth_header(client: TestClient):
    response = client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "Admin@123"},
    )
    token = response.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}
