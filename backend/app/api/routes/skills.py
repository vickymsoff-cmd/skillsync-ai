from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Skill, UserSkill
from app.schemas.schemas import SkillResponse, UserSkillResponse
from typing import List

router = APIRouter()

@router.get("", response_model=List[SkillResponse])
async def list_skills(category: str = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all skills"""
    query = db.query(Skill)
    if category:
        query = query.filter(Skill.category == category)
    skills = query.offset(skip).limit(limit).all()
    return skills

@router.get("/{skill_id}", response_model=SkillResponse)
async def get_skill(skill_id: str, db: Session = Depends(get_db)):
    """Get skill by ID"""
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    return skill

@router.post("")
async def create_skill():
    """Create new skill"""
    return {"message": "Skill created"}

@router.get("/user/{user_id}", response_model=List[UserSkillResponse])
async def get_user_skills(user_id: str, db: Session = Depends(get_db)):
    """Get all skills for a user"""
    user_skills = db.query(UserSkill).filter(UserSkill.user_id == user_id).all()
    return user_skills

@router.post("/user/skill")
async def add_user_skill():
    """Add a skill to user's profile"""
    return {"message": "Skill added"}

@router.put("/user/skill/{user_skill_id}")
async def update_user_skill():
    """Update user's skill"""
    return {"message": "Skill updated"}
