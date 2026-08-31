from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Assessment, AssessmentAttempt
from app.schemas.schemas import AssessmentResponse, AssessmentAttemptResponse
from typing import List

router = APIRouter()

@router.get("", response_model=List[AssessmentResponse])
async def list_assessments(category: str = None, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List assessments"""
    query = db.query(Assessment).filter(Assessment.is_published == True)
    if category:
        query = query.filter(Assessment.category == category)
    assessments = query.offset(skip).limit(limit).all()
    return assessments

@router.get("/{assessment_id}", response_model=AssessmentResponse)
async def get_assessment(assessment_id: str, db: Session = Depends(get_db)):
    """Get assessment details"""
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    return assessment

@router.post("/{assessment_id}/start")
async def start_assessment(assessment_id: str):
    """Start an assessment"""
    return {"message": "Assessment started"}

@router.post("/{assessment_id}/submit")
async def submit_assessment(assessment_id: str, answers: dict):
    """Submit assessment answers"""
    return {"message": "Assessment submitted"}

@router.get("/attempts/{user_id}", response_model=List[AssessmentAttemptResponse])
async def get_user_attempts(user_id: str, db: Session = Depends(get_db)):
    """Get user's assessment attempts"""
    attempts = db.query(AssessmentAttempt).filter(AssessmentAttempt.user_id == user_id).all()
    return attempts

@router.get("/attempt/{attempt_id}", response_model=AssessmentAttemptResponse)
async def get_attempt(attempt_id: str, db: Session = Depends(get_db)):
    """Get assessment attempt details"""
    attempt = db.query(AssessmentAttempt).filter(AssessmentAttempt.id == attempt_id).first()
    return attempt
