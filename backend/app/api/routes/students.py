from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user_id
from app.models.models import StudentProfile
from app.schemas.schemas import StudentProfileResponse
from typing import List

router = APIRouter()

@router.get("/me", response_model=StudentProfileResponse)
async def get_my_profile(
    current_user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Get current student profile"""
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user_id).first()
    return profile

@router.get("/{student_id}", response_model=StudentProfileResponse)
async def get_student(student_id: str, db: Session = Depends(get_db)):
    """Get student profile"""
    profile = db.query(StudentProfile).filter(StudentProfile.id == student_id).first()
    return profile

@router.get("", response_model=List[StudentProfileResponse])
async def list_students(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List students"""
    profiles = db.query(StudentProfile).offset(skip).limit(limit).all()
    return profiles

@router.get("/dashboard")
async def get_dashboard(
    current_user_id: str = Depends(get_current_user_id),
    db: Session = Depends(get_db),
):
    """Get student dashboard data"""
    # Get student profile
    profile = db.query(StudentProfile).filter(StudentProfile.user_id == current_user_id).first()
    
    return {
        "profile": profile,
        "industry_readiness_score": profile.industry_readiness_score if profile else 0,
        # Will add more dashboard data
    }
