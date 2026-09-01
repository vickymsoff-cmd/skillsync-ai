from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    academicians,
    analytics,
    applications,
    assessments,
    auth,
    industries,
    opportunities,
    portfolios,
    recommendations,
    skills,
    students,
    users,
)
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(
    title="SkillSync AI",
    description="AI-Powered Academia-Industry Collaboration Platform",
    version="1.0.0",
)


def init_db():
    Base.metadata.create_all(bind=engine)


init_db()


@app.on_event("startup")
def startup_event():
    init_db()


# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(students.router, prefix="/api/students", tags=["students"])
app.include_router(academicians.router, prefix="/api/academicians", tags=["academicians"])
app.include_router(industries.router, prefix="/api/industries", tags=["industries"])
app.include_router(skills.router, prefix="/api/skills", tags=["skills"])
app.include_router(assessments.router, prefix="/api/assessments", tags=["assessments"])
app.include_router(opportunities.router, prefix="/api/opportunities", tags=["opportunities"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])
app.include_router(portfolios.router, prefix="/api/portfolios", tags=["portfolios"])
app.include_router(recommendations.router, prefix="/api/recommendations", tags=["recommendations"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])

@app.get("/")
async def root():
    return {
        "message": "SkillSync AI - Academia-Industry Collaboration Platform",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
