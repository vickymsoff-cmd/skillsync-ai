from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Application
from app.schemas.schemas import ApplicationResponse
from typing import List

router = APIRouter()

@router.get("", response_model=List[ApplicationResponse])
async def get_my_applications(current_user_id: str, status: str = None, db: Session = Depends(get_db)):
    """Get user's applications"""
    query = db.query(Application).filter(Application.student_id == current_user_id)
    if status:
        query = query.filter(Application.status == status)
    applications = query.all()
    return applications

@router.get("/{application_id}", response_model=ApplicationResponse)
async def get_application(application_id: str, db: Session = Depends(get_db)):
    """Get application details"""
    application = db.query(Application).filter(Application.id == application_id).first()
    return application

@router.post("/{opportunity_id}")
async def apply_opportunity(opportunity_id: str, current_user_id: str):
    """Apply for an opportunity"""
    return {"message": "Application submitted"}

@router.put("/{application_id}/status")
async def update_application_status(application_id: str, status: str):
    """Update application status"""
    return {"message": "Status updated"}

@router.get("/tracking/kanban")
async def get_kanban_view(current_user_id: str):
    """Get Kanban view of applications"""
    return {"message": "Kanban view"}
