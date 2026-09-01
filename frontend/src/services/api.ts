import axios, { AxiosInstance } from "axios";
import { AuthTokens, LoginRequest, RegisterRequest } from "@/types";

// Use relative URLs for API endpoints (they're in the same application now)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth APIs
  async register(data: RegisterRequest): Promise<AuthTokens> {
    const response = await this.api.post("/api/auth/register", data);
    return response.data;
  }

  async login(data: LoginRequest): Promise<AuthTokens> {
    const response = await this.api.post("/api/auth/login", data);
    return response.data;
  }

  // User APIs
  async getCurrentUser() {
    const response = await this.api.get("/api/users/me");
    return response.data;
  }

  async getUser(userId: string) {
    const response = await this.api.get(`/api/users/${userId}`);
    return response.data;
  }

  // Student APIs
  async getStudentProfile() {
    const response = await this.api.get("/api/students/me");
    return response.data;
  }

  async getStudentDashboard() {
    const response = await this.api.get("/api/students/dashboard");
    return response.data;
  }

  // Skills APIs
  async getSkills(category?: string) {
    const response = await this.api.get("/api/skills", {
      params: { category },
    });
    return response.data;
  }

  async getUserSkills(userId: string) {
    const response = await this.api.get(`/api/skills/user/${userId}`);
    return response.data;
  }

  async addUserSkill(data: any) {
    const response = await this.api.post("/api/skills/user/skill", data);
    return response.data;
  }

  // Assessment APIs
  async getAssessments(category?: string) {
    const response = await this.api.get("/api/assessments", {
      params: { category },
    });
    return response.data;
  }

  async getAssessment(assessmentId: string) {
    const response = await this.api.get(`/api/assessments/${assessmentId}`);
    return response.data;
  }

  async getUserAssessmentAttempts() {
    const response = await this.api.get("/api/assessments/attempts/me");
    return response.data;
  }

  // Opportunities APIs
  async getOpportunities(filters?: any) {
    const response = await this.api.get("/api/opportunities", {
      params: filters,
    });
    return response.data;
  }

  async getOpportunity(opportunityId: string) {
    const response = await this.api.get(
      `/api/opportunities/${opportunityId}`
    );
    return response.data;
  }

  async applyForOpportunity(opportunityId: string) {
    const response = await this.api.post(
      `/api/applications/${opportunityId}`
    );
    return response.data;
  }

  // Applications APIs
  async getMyApplications(status?: string) {
    const response = await this.api.get("/api/applications", {
      params: { status },
    });
    return response.data;
  }

  async getApplication(applicationId: string) {
    const response = await this.api.get(
      `/api/applications/${applicationId}`
    );
    return response.data;
  }

  // Portfolio APIs
  async getMyPortfolio() {
    const response = await this.api.get("/api/portfolios/me");
    return response.data;
  }

  async getPortfolio(portfolioId: string) {
    const response = await this.api.get(`/api/portfolios/${portfolioId}`);
    return response.data;
  }

  // Recommendations APIs
  async getOpportunityRecommendations() {
    const response = await this.api.get("/api/recommendations/opportunities");
    return response.data;
  }

  async getProgramRecommendations() {
    const response = await this.api.get("/api/recommendations/programs");
    return response.data;
  }

  async getCareerRecommendations() {
    const response = await this.api.get("/api/recommendations/careers");
    return response.data;
  }

  async getSkillRecommendations() {
    const response = await this.api.get("/api/recommendations/skills");
    return response.data;
  }

  // Analytics APIs
  async getInstitutionAnalytics() {
    const response = await this.api.get("/api/analytics/institution/dashboard");
    return response.data;
  }

  async getPlacementAnalytics() {
    const response = await this.api.get("/api/analytics/placement-analytics");
    return response.data;
  }
}

export default new ApiService();
