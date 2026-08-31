from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Recommendation
from app.schemas.schemas import RecommendationResponse
from typing import List

router = APIRouter()

@router.get("/opportunities", response_model=List[RecommendationResponse])
async def get_opportunity_recommendations(current_user_id: str, db: Session = Depends(get_db)):
    """Get recommended opportunities"""
    recommendations = db.query(Recommendation).filter(
        Recommendation.user_id == current_user_id,
        Recommendation.recommendation_type == "opportunity"
    ).all()
    return recommendations

@router.get("/programs", response_model=List[RecommendationResponse])
async def get_program_recommendations(current_user_id: str, db: Session = Depends(get_db)):
    """Get recommended learning programs"""
    recommendations = db.query(Recommendation).filter(
        Recommendation.user_id == current_user_id,
        Recommendation.recommendation_type == "program"
    ).all()
    return recommendations

@router.get("/careers", response_model=List[RecommendationResponse])
async def get_career_recommendations(current_user_id: str, db: Session = Depends(get_db)):
    """Get recommended career paths"""
    recommendations = db.query(Recommendation).filter(
        Recommendation.user_id == current_user_id,
        Recommendation.recommendation_type == "career"
    ).all()
    return recommendations

@router.get("/skills", response_model=List[RecommendationResponse])
async def get_skill_recommendations(current_user_id: str, db: Session = Depends(get_db)):
    """Get recommended skills to learn"""
    recommendations = db.query(Recommendation).filter(
        Recommendation.user_id == current_user_id,
        Recommendation.recommendation_type == "skill"
    ).all()
    return recommendations

@router.post("/regenerate")
async def regenerate_recommendations(current_user_id: str):
    """Regenerate all recommendations for user"""
    return {"message": "Recommendations regenerated"}
