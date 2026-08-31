from fastapi import APIRouter

router = APIRouter()

@router.get("/dashboard")
async def get_academician_dashboard():
    """Get academician dashboard"""
    return {"message": "Academician dashboard"}

@router.get("/me")
async def get_my_profile():
    """Get current academician profile"""
    return {"message": "Academician profile"}
