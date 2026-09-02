import json
from typing import List

from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillSync AI"
    PROJECT_VERSION: str = "1.0.0"

    # Database
    DATABASE_URL: str = Field(default="sqlite:///./skillsync.db")

    # JWT
    SECRET_KEY: str = Field(default="your-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS - Accept either comma-separated values or JSON array values
    CORS_ORIGINS: str = Field(default="http://localhost:3000,http://localhost:3001,https://frontend-jade-two-24.vercel.app,https://skillsync-ai.vercel.app,https://frontend-ebl8o7udw-vickymsoff-cmd.vercel.app")

    @property
    def cors_origins_list(self) -> List[str]:
        value = self.CORS_ORIGINS or ""
        configured_origins: List[str] = []
        if value.strip().startswith("["):
            try:
                parsed = json.loads(value)
                if isinstance(parsed, list):
                    configured_origins = [
                        str(item).strip() for item in parsed if str(item).strip()
                    ]
            except json.JSONDecodeError:
                pass
        else:
            configured_origins = [
                item.strip() for item in value.split(",") if item.strip()
            ]

        # Keep the deployed frontend origins available even if Railway's
        # CORS_ORIGINS variable contains an outdated value.
        required_origins = [
            "https://skillsync-ai.vercel.app",
            "https://skillsync-ai-mkq3.vercel.app",
        ]
        return list(dict.fromkeys(configured_origins + required_origins))

    # Email
    SMTP_SERVER: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SENDER_EMAIL: str = "noreply@skillsync.ai"
    SENDER_PASSWORD: str = ""

    # API
    API_PREFIX: str = "/api"

    class Config:
        env_file = ".env"


settings = Settings()
