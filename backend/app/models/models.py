from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, Enum, Table, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.database import Base

# Association Tables
user_skills = Table(
    'user_skills',
    Base.metadata,
    Column('user_id', String, ForeignKey('users.id')),
    Column('skill_id', String, ForeignKey('skills.id'))
)

opportunity_skills = Table(
    'opportunity_skills',
    Base.metadata,
    Column('opportunity_id', String, ForeignKey('opportunities.id')),
    Column('skill_id', String, ForeignKey('skills.id'))
)

# Enums
class UserRole(str, enum.Enum):
    STUDENT = "student"
    ACADEMICIAN = "academician"
    INDUSTRY = "industry"
    INSTITUTION_ADMIN = "institution_admin"
    SUPER_ADMIN = "super_admin"

class SkillLevel(str, enum.Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class VerificationLevel(str, enum.Enum):
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"
    PLATINUM = "platinum"

class OpportunityType(str, enum.Enum):
    INTERNSHIP = "internship"
    JOB = "job"
    APPRENTICESHIP = "apprenticeship"
    PROJECT = "project"
    WORKSHOP = "workshop"
    TRAINING = "training"

class ApplicationStatus(str, enum.Enum):
    SAVED = "saved"
    APPLIED = "applied"
    UNDER_REVIEW = "under_review"
    ASSESSMENT = "assessment"
    INTERVIEW = "interview"
    SELECTED = "selected"
    REJECTED = "rejected"
    COMPLETED = "completed"

# Main Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    password_hash = Column(String)
    role = Column(Enum(UserRole))
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    profile_image = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)
    academician_profile = relationship("AcademicianProfile", back_populates="user", uselist=False)
    industry_profile = relationship("IndustryProfile", back_populates="user", uselist=False)
    institution_profile = relationship("InstitutionProfile", back_populates="user", uselist=False)
    skills = relationship("Skill", secondary=user_skills)

class StudentProfile(Base):
    __tablename__ = "student_profiles"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    institution_id = Column(String, ForeignKey('institutions.id'), nullable=True)
    department = Column(String, nullable=True)
    enrollment_number = Column(String, nullable=True)
    graduation_year = Column(Integer, nullable=True)
    career_goals = Column(Text, nullable=True)
    industry_readiness_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="student_profile")
    institution = relationship("Institution", back_populates="students")

class AcademicianProfile(Base):
    __tablename__ = "academician_profiles"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    institution_id = Column(String, ForeignKey('institutions.id'), nullable=True)
    department = Column(String, nullable=True)
    designation = Column(String, nullable=True)
    expertise_areas = Column(Text, nullable=True)
    publications = Column(Integer, default=0)
    patents = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="academician_profile")
    institution = relationship("Institution", back_populates="academicians")

class IndustryProfile(Base):
    __tablename__ = "industry_profiles"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    company_name = Column(String)
    company_size = Column(String)
    industry_type = Column(String)
    website = Column(String, nullable=True)
    location = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="industry_profile")

class InstitutionProfile(Base):
    __tablename__ = "institution_profiles"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    institution_name = Column(String)
    institution_type = Column(String)
    location = Column(String, nullable=True)
    website = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="institution_profile")
    students = relationship("StudentProfile", back_populates="institution")
    academicians = relationship("AcademicianProfile", back_populates="institution")

class Institution(Base):
    __tablename__ = "institutions"
    
    id = Column(String, primary_key=True)
    name = Column(String, unique=True)
    location = Column(String)
    website = Column(String, nullable=True)
    type = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    students = relationship("StudentProfile", back_populates="institution")
    academicians = relationship("AcademicianProfile", back_populates="institution")

class Skill(Base):
    __tablename__ = "skills"
    
    id = Column(String, primary_key=True)
    name = Column(String, unique=True)
    category = Column(String)  # Technical, Soft, Domain, etc.
    description = Column(Text, nullable=True)
    industry_demand = Column(Float, default=0.5)
    created_at = Column(DateTime, default=datetime.utcnow)

class UserSkill(Base):
    __tablename__ = "user_skill_details"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    skill_id = Column(String, ForeignKey('skills.id'))
    skill_level = Column(Enum(SkillLevel), default=SkillLevel.BEGINNER)
    verification_level = Column(Enum(VerificationLevel), default=VerificationLevel.BRONZE)
    proficiency_score = Column(Float, default=0.0)
    evidence = Column(Text, nullable=True)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Assessment(Base):
    __tablename__ = "assessments"
    
    id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(Text, nullable=True)
    category = Column(String)  # Technical, Soft Skills, etc.
    created_by = Column(String, ForeignKey('users.id'))
    duration_minutes = Column(Integer)
    total_questions = Column(Integer)
    difficulty_level = Column(String)
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class AssessmentAttempt(Base):
    __tablename__ = "assessment_attempts"
    
    id = Column(String, primary_key=True)
    assessment_id = Column(String, ForeignKey('assessments.id'))
    user_id = Column(String, ForeignKey('users.id'))
    score = Column(Float)
    completion_percentage = Column(Float)
    time_taken_seconds = Column(Integer)
    started_at = Column(DateTime)
    completed_at = Column(DateTime, nullable=True)

class CareerRole(Base):
    __tablename__ = "career_roles"
    
    id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(Text, nullable=True)
    industry_demand = Column(Float)
    avg_salary = Column(Integer, nullable=True)

class CareerRoleSkills(Base):
    __tablename__ = "career_role_skills"
    
    id = Column(String, primary_key=True)
    career_role_id = Column(String, ForeignKey('career_roles.id'))
    skill_id = Column(String, ForeignKey('skills.id'))
    importance_level = Column(String)  # Critical, Important, Nice-to-have

class SkillGap(Base):
    __tablename__ = "skill_gaps"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    career_role_id = Column(String, ForeignKey('career_roles.id'))
    current_level = Column(Float)
    required_level = Column(Float)
    gap_percentage = Column(Float)
    priority = Column(String)  # Critical, High, Medium, Low
    created_at = Column(DateTime, default=datetime.utcnow)

class LearningProgram(Base):
    __tablename__ = "learning_programs"
    
    id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(Text)
    provider = Column(String)
    category = Column(String)
    difficulty_level = Column(String)
    duration_hours = Column(Integer)
    industry_relevance_score = Column(Float)
    certification_available = Column(Boolean, default=False)
    enrollment_link = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class LearningProgress(Base):
    __tablename__ = "learning_progress"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    learning_program_id = Column(String, ForeignKey('learning_programs.id'))
    progress_percentage = Column(Float, default=0.0)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

class Opportunity(Base):
    __tablename__ = "opportunities"
    
    id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(Text)
    opportunity_type = Column(Enum(OpportunityType))
    company_id = Column(String, ForeignKey('users.id'))
    required_skills = Column(JSON)
    preferred_skills = Column(JSON, nullable=True)
    minimum_skill_level = Column(String)
    location = Column(String)
    is_remote = Column(Boolean, default=False)
    duration = Column(String, nullable=True)
    stipend = Column(Integer, nullable=True)
    eligibility_criteria = Column(Text, nullable=True)
    deadline = Column(DateTime)
    available_positions = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    
    skills = relationship("Skill", secondary=opportunity_skills)

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(String, primary_key=True)
    opportunity_id = Column(String, ForeignKey('opportunities.id'))
    student_id = Column(String, ForeignKey('users.id'))
    status = Column(Enum(ApplicationStatus), default=ApplicationStatus.APPLIED)
    match_score = Column(Float)
    match_reasons = Column(JSON)
    applied_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Portfolio(Base):
    __tablename__ = "portfolios"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    title = Column(String)
    description = Column(Text, nullable=True)
    public_url = Column(String, unique=True)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(Text)
    portfolio_id = Column(String, ForeignKey('portfolios.id'))
    skills_used = Column(JSON)
    github_link = Column(String, nullable=True)
    live_link = Column(String, nullable=True)
    images = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Certificate(Base):
    __tablename__ = "certificates"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    title = Column(String)
    issuer = Column(String)
    issue_date = Column(DateTime)
    expiry_date = Column(DateTime, nullable=True)
    credential_url = Column(String, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    recommendation_type = Column(String)  # Opportunity, Program, Career, Skill
    target_id = Column(String)
    score = Column(Float)
    reasons = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    
    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey('users.id'))
    title = Column(String)
    message = Column(Text)
    notification_type = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
