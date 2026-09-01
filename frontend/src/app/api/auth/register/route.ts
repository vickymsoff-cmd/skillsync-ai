import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name, role } = body;

    // Mock registration
    if (email && password && full_name && role) {
      return NextResponse.json(
        {
          access_token:
            "mock_access_token_" + Math.random().toString(36).substr(2, 9),
          refresh_token:
            "mock_refresh_token_" + Math.random().toString(36).substr(2, 9),
          token_type: "bearer",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { detail: "Missing required fields" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { detail: "Registration failed" },
      { status: 500 }
    );
  }
}
