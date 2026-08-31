from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Portfolio, Project
from app.schemas.schemas import PortfolioResponse, ProjectResponse
from typing import List

router = APIRouter()

@router.get("", response_model=List[PortfolioResponse])
async def list_portfolios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """List portfolios"""
    portfolios = db.query(Portfolio).offset(skip).limit(limit).all()
    return portfolios

@router.get("/me", response_model=PortfolioResponse)
async def get_my_portfolio(current_user_id: str, db: Session = Depends(get_db)):
    """Get current user's portfolio"""
    portfolio = db.query(Portfolio).filter(Portfolio.user_id == current_user_id).first()
    return portfolio

@router.get("/{portfolio_id}", response_model=PortfolioResponse)
async def get_portfolio(portfolio_id: str, db: Session = Depends(get_db)):
    """Get portfolio by ID"""
    portfolio = db.query(Portfolio).filter(Portfolio.id == portfolio_id).first()
    return portfolio

@router.post("")
async def create_portfolio(current_user_id: str):
    """Create new portfolio"""
    return {"message": "Portfolio created"}

@router.put("/{portfolio_id}")
async def update_portfolio(portfolio_id: str):
    """Update portfolio"""
    return {"message": "Portfolio updated"}

@router.get("/{portfolio_id}/projects", response_model=List[ProjectResponse])
async def get_portfolio_projects(portfolio_id: str, db: Session = Depends(get_db)):
    """Get projects in portfolio"""
    projects = db.query(Project).filter(Project.portfolio_id == portfolio_id).all()
    return projects

@router.post("/{portfolio_id}/projects")
async def add_project(portfolio_id: str):
    """Add project to portfolio"""
    return {"message": "Project added"}

@router.get("/public/{public_url}")
async def get_public_portfolio(public_url: str, db: Session = Depends(get_db)):
    """Get public portfolio view"""
    portfolio = db.query(Portfolio).filter(
        Portfolio.public_url == public_url,
        Portfolio.is_public == True
    ).first()
    return portfolio
