import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mock opportunities list
    return NextResponse.json(
      [
        {
          id: "opp_1",
          title: "React Internship",
          company: "Tech Startup Inc",
          description: "6-month internship working with React and Node.js",
          type: "internship",
          required_skills: ["React", "JavaScript", "Node.js"],
          salary_min: 15000,
          salary_max: 20000,
          location: "Remote",
          posted_date: new Date().toISOString(),
        },
        {
          id: "opp_2",
          title: "Python Developer",
          company: "Data Analytics Co",
          description: "Full-time position for Python backend development",
          type: "job",
          required_skills: ["Python", "FastAPI", "PostgreSQL"],
          salary_min: 50000,
          salary_max: 70000,
          location: "New York, NY",
          posted_date: new Date().toISOString(),
        },
      ],
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}
