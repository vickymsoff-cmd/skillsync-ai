import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mock student dashboard data
    return NextResponse.json(
      {
        id: "student_123",
        user_id: "user_123",
        skills: [
          {
            id: "skill_1",
            name: "Python",
            proficiency: "intermediate",
            endorsed_count: 12,
          },
          {
            id: "skill_2",
            name: "React",
            proficiency: "advanced",
            endorsed_count: 8,
          },
          {
            id: "skill_3",
            name: "Machine Learning",
            proficiency: "beginner",
            endorsed_count: 5,
          },
        ],
        assessments_completed: 3,
        opportunities_applied: 2,
        profile_completeness: 75,
        recommended_learning_paths: [
          {
            id: "path_1",
            title: "Full Stack Web Development",
            description: "Master frontend and backend development",
            duration_hours: 120,
            difficulty: "intermediate",
          },
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to fetch dashboard" },
      { status: 500 }
    );
  }
}
