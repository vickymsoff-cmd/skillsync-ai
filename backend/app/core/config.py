from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillSync AI"
    PROJECT_VERSION: str = "1.0.0"
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/skillsync_ai"
    
    # JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:3001"]
    
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
