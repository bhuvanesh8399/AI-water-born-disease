from functools import lru_cache
from typing import List

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AI-Based Early Warning System"
    app_env: str = "development"
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 120
    database_url: str = "sqlite:///./ews.db"
    cors_origins: List[str] | str = ["http://localhost:5173"]
    default_admin_email: str = "admin@example.com"
    default_admin_password: str = "Admin@123"
    default_analyst_email: str = "analyst@example.com"
    default_analyst_password: str = "Analyst@123"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_origins(cls, value):
        if isinstance(value, str):
            return [item.strip() for item in value.split(",") if item.strip()]
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
