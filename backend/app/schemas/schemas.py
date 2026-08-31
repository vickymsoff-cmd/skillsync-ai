from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

# Auth Schemas
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str  # student, academician, industry, institution_admin

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    is_active: bool
    is_verified: bool
    profile_image: Optional[str]
    bio: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Student Profile Schemas
class StudentProfileCreate(BaseModel):
    institution_id: Optional[str] = None
    department: Optional[str] = None
    enrollment_number: Optional[str] = None
    graduation_year: Optional[int] = None
    career_goals: Optional[str] = None

class StudentProfileUpdate(BaseModel):
    department: Optional[str] = None
    career_goals: Optional[str] = None
    institution_id: Optional[str] = None

class StudentProfileResponse(BaseModel):
    id: str
    user_id: str
    institution_id: Optional[str]
    department: Optional[str]
    enrollment_number: Optional[str]
    graduation_year: Optional[int]
    career_goals: Optional[str]
    industry_readiness_score: float
    
    class Config:
        from_attributes = True

# Skill Schemas
class SkillCreate(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    industry_demand: float = 0.5

class SkillResponse(BaseModel):
    id: str
    name: str
    category: str
    description: Optional[str]
    industry_demand: float
    
    class Config:
        from_attributes = True

class UserSkillCreate(BaseModel):
    skill_id: str
    skill_level: str
    proficiency_score: float

class UserSkillResponse(BaseModel):
    id: str
    user_id: str
    skill_id: str
    skill_level: str
    verification_level: str
    proficiency_score: float
    
    class Config:
        from_attributes = True

# Assessment Schemas
class AssessmentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    duration_minutes: int
    total_questions: int
    difficulty_level: str

class AssessmentResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    category: str
    duration_minutes: int
    total_questions: int
    difficulty_level: str
    is_published: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class AssessmentAttemptCreate(BaseModel):
    assessment_id: str

class AssessmentAttemptResponse(BaseModel):
    id: str
    assessment_id: str
    user_id: str
    score: float
    completion_percentage: float
    time_taken_seconds: int
    started_at: datetime
    completed_at: Optional[datetime]
    
    class Config:
        from_attributes = True

# Career Role Schemas
class CareerRoleResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    industry_demand: float
    avg_salary: Optional[int]
    
    class Config:
        from_attributes = True

# Skill Gap Schemas
class SkillGapCreate(BaseModel):
    career_role_id: str

class SkillGapResponse(BaseModel):
    id: str
    user_id: str
    career_role_id: str
    current_level: float
    required_level: float
    gap_percentage: float
    priority: str
    
    class Config:
        from_attributes = True

# Learning Program Schemas
class LearningProgramCreate(BaseModel):
    title: str
    description: str
    provider: str
    category: str
    difficulty_level: str
    duration_hours: int
    industry_relevance_score: float
    enrollment_link: Optional[str] = None

class LearningProgramResponse(BaseModel):
    id: str
    title: str
    description: str
    provider: str
    category: str
    difficulty_level: str
    duration_hours: int
    industry_relevance_score: float
    certification_available: bool
    
    class Config:
        from_attributes = True

# Opportunity Schemas
class OpportunityCreate(BaseModel):
    title: str
    description: str
    opportunity_type: str
    required_skills: List[str]
    preferred_skills: Optional[List[str]] = None
    minimum_skill_level: str
    location: str
    is_remote: bool = False
    duration: Optional[str] = None
    stipend: Optional[int] = None
    eligibility_criteria: Optional[str] = None
    deadline: datetime
    available_positions: int

class OpportunityResponse(BaseModel):
    id: str
    title: str
    description: str
    opportunity_type: str
    location: str
    is_remote: bool
    duration: Optional[str]
    stipend: Optional[int]
    deadline: datetime
    available_positions: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Application Schemas
class ApplicationCreate(BaseModel):
    opportunity_id: str

class ApplicationResponse(BaseModel):
    id: str
    opportunity_id: str
    student_id: str
    status: str
    match_score: float
    match_reasons: Dict[str, Any]
    applied_at: datetime
    
    class Config:
        from_attributes = True

# Portfolio Schemas
class PortfolioCreate(BaseModel):
    title: str
    description: Optional[str] = None

class PortfolioResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: Optional[str]
    public_url: str
    is_public: bool
    
    class Config:
        from_attributes = True

# Project Schemas
class ProjectCreate(BaseModel):
    title: str
    description: str
    skills_used: List[str]
    github_link: Optional[str] = None
    live_link: Optional[str] = None

class ProjectResponse(BaseModel):
    id: str
    title: str
    description: str
    skills_used: List[str]
    github_link: Optional[str]
    live_link: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Recommendation Schemas
class RecommendationResponse(BaseModel):
    id: str
    user_id: str
    recommendation_type: str
    target_id: str
    score: float
    reasons: Dict[str, Any]
    
    class Config:
        from_attributes = True

# Analytics Schemas
class SkillAnalyticsResponse(BaseModel):
    total_students: int
    average_readiness_score: float
    skill_demand_analysis: Dict[str, float]
    department_wise_skills: Dict[str, Dict[str, float]]
