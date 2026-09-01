import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get auth token from header
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { detail: "Not authenticated" },
        { status: 401 }
      );
    }

    // Mock current user data
    return NextResponse.json(
      {
        id: "user_123",
        email: "student@example.com",
        full_name: "John Student",
        role: "student",
        avatar_url: null,
        bio: null,
        created_at: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { detail: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
