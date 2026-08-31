from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Opportunity
from app.schemas.schemas import OpportunityResponse
from typing import List

router = APIRouter()

@router.get("", response_model=List[OpportunityResponse])
async def list_opportunities(
    opportunity_type: str = None,
    location: str = None,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """List opportunities"""
    query = db.query(Opportunity).filter(Opportunity.is_active == True)
    if opportunity_type:
        query = query.filter(Opportunity.opportunity_type == opportunity_type)
    if location:
        query = query.filter(Opportunity.location == location)
    opportunities = query.offset(skip).limit(limit).all()
    return opportunities

@router.get("/{opportunity_id}", response_model=OpportunityResponse)
async def get_opportunity(opportunity_id: str, db: Session = Depends(get_db)):
    """Get opportunity details"""
    opportunity = db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()
    return opportunity

@router.post("")
async def create_opportunity():
    """Create new opportunity (Industry only)"""
    return {"message": "Opportunity created"}

@router.put("/{opportunity_id}")
async def update_opportunity(opportunity_id: str):
    """Update opportunity"""
    return {"message": "Opportunity updated"}

@router.delete("/{opportunity_id}")
async def delete_opportunity(opportunity_id: str):
    """Delete opportunity"""
    return {"message": "Opportunity deleted"}

@router.get("/recommended")
async def get_recommended_opportunities(current_user_id: str):
    """Get recommended opportunities for student"""
    return {"message": "Recommended opportunities"}
