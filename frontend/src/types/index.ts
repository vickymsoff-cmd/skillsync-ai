// User Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  profile_image?: string;
  bio?: string;
  created_at: string;
}

export enum UserRole {
  STUDENT = "student",
  ACADEMICIAN = "academician",
  INDUSTRY = "industry",
  INSTITUTION_ADMIN = "institution_admin",
  SUPER_ADMIN = "super_admin",
}

// Auth Types
export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  role: string;
}

// Student Types
export interface StudentProfile {
  id: string;
  user_id: string;
  institution_id?: string;
  department?: string;
  enrollment_number?: string;
  graduation_year?: number;
  career_goals?: string;
  industry_readiness_score: number;
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  industry_demand: number;
}

export enum SkillLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
  EXPERT = "expert",
}

export enum VerificationLevel {
  BRONZE = "bronze",
  SILVER = "silver",
  GOLD = "gold",
  PLATINUM = "platinum",
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_id: string;
  skill_level: SkillLevel;
  verification_level: VerificationLevel;
  proficiency_score: number;
}

// Assessment Types
export interface Assessment {
  id: string;
  title: string;
  description?: string;
  category: string;
  duration_minutes: number;
  total_questions: number;
  difficulty_level: string;
  is_published: boolean;
}

// Opportunity Types
export enum OpportunityType {
  INTERNSHIP = "internship",
  JOB = "job",
  APPRENTICESHIP = "apprenticeship",
  PROJECT = "project",
  WORKSHOP = "workshop",
  TRAINING = "training",
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  opportunity_type: OpportunityType;
  location: string;
  is_remote: boolean;
  duration?: string;
  stipend?: number;
  deadline: string;
  available_positions: number;
  is_active: boolean;
}

// Application Types
export enum ApplicationStatus {
  SAVED = "saved",
  APPLIED = "applied",
  UNDER_REVIEW = "under_review",
  ASSESSMENT = "assessment",
  INTERVIEW = "interview",
  SELECTED = "selected",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

export interface Application {
  id: string;
  opportunity_id: string;
  student_id: string;
  status: ApplicationStatus;
  match_score: number;
  match_reasons: Record<string, any>;
  applied_at: string;
}

// Dashboard Types
export interface DashboardStats {
  total_skills: number;
  verified_skills: number;
  applications: number;
  internships_completed: number;
  industry_readiness_score: number;
}

// Learning Program Types
export interface LearningProgram {
  id: string;
  title: string;
  description: string;
  provider: string;
  category: string;
  difficulty_level: string;
  duration_hours: number;
  industry_relevance_score: number;
  certification_available: boolean;
}

// Recommendation Types
export interface Recommendation {
  id: string;
  user_id: string;
  recommendation_type: string;
  target_id: string;
  score: number;
  reasons: Record<string, any>;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  skip: number;
  limit: number;
}
