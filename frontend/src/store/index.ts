import { create } from "zustand";
import { User, AuthTokens } from "@/types";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  login: (user: User, tokens: AuthTokens) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setTokens: (tokens) => set({ tokens }),
  setLoading: (isLoading) => set({ isLoading }),

  login: (user, tokens) =>
    set({
      user,
      tokens,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      tokens: null,
      isAuthenticated: false,
    }),
}));

// Student Store
interface StudentState {
  profile: any | null;
  dashboardData: any | null;
  setProfile: (profile: any) => void;
  setDashboardData: (data: any) => void;
}

export const useStudentStore = create<StudentState>((set) => ({
  profile: null,
  dashboardData: null,
  setProfile: (profile) => set({ profile }),
  setDashboardData: (dashboardData) => set({ dashboardData }),
}));

// Skills Store
interface SkillsState {
  skills: any[];
  userSkills: any[];
  setSkills: (skills: any[]) => void;
  setUserSkills: (userSkills: any[]) => void;
}

export const useSkillsStore = create<SkillsState>((set) => ({
  skills: [],
  userSkills: [],
  setSkills: (skills) => set({ skills }),
  setUserSkills: (userSkills) => set({ userSkills }),
}));

// Opportunities Store
interface OpportunitiesState {
  opportunities: any[];
  filteredOpportunities: any[];
  setOpportunities: (opportunities: any[]) => void;
  setFilteredOpportunities: (opportunities: any[]) => void;
}

export const useOpportunitiesStore = create<OpportunitiesState>((set) => ({
  opportunities: [],
  filteredOpportunities: [],
  setOpportunities: (opportunities) => set({ opportunities }),
  setFilteredOpportunities: (filteredOpportunities) =>
    set({ filteredOpportunities }),
}));

// Applications Store
interface ApplicationsState {
  applications: any[];
  setApplications: (applications: any[]) => void;
}

export const useApplicationsStore = create<ApplicationsState>((set) => ({
  applications: [],
  setApplications: (applications) => set({ applications }),
}));

// Recommendations Store
interface RecommendationsState {
  opportunities: any[];
  programs: any[];
  careers: any[];
  skills: any[];
  setOpportunityRecommendations: (recs: any[]) => void;
  setProgramRecommendations: (recs: any[]) => void;
  setCareerRecommendations: (recs: any[]) => void;
  setSkillRecommendations: (recs: any[]) => void;
}

export const useRecommendationsStore = create<RecommendationsState>((set) => ({
  opportunities: [],
  programs: [],
  careers: [],
  skills: [],
  setOpportunityRecommendations: (opportunities) =>
    set({ opportunities }),
  setProgramRecommendations: (programs) => set({ programs }),
  setCareerRecommendations: (careers) => set({ careers }),
  setSkillRecommendations: (skills) => set({ skills }),
}));
